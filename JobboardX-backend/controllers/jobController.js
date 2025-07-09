const Job = require('../models/Job');

//Recuiters create a job
exports.createJob = async (req,res) => {
    try {
        const job = await Job.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json(job);
    } catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
    console.log("Creating job for user:", req.user.id);
    console.log(req.user);

};

// Anyone views jobs
exports.getAllJobs = async(req,res) => {
    try {
        const jobs = await Job.find().populate("createdBy", "name email");
        res.json(jobs);
    }catch(err) {
        res.status(500).json({message: err.message});   
    }
}

// Candidate Applies
exports.applyToJobs = async(req,res) => {
    try {
        const job = await Job.findById(req.params.id);
        if(!job) return res.status(404).json({message: "Job Not Found"});

        if(job.applicants.includes(req.user.id)) {
            return res.status(400).json({ message: "Already applied" });
        }

        job.applicants.push(req.user.id);
        await job.save();

        res.json({ message: "Applied Successfully" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Recuiters see there own jobs
exports.getMyPostedJobs = async(req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user.id });
        res.json(jobs);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Candidate see applied jobs 
exports.getAllApplication = async (req,res) => {
    try {
        const jobs = await Job.find({ applicants: req.user.id });
        res.json(jobs);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// PATCH /jobs/:id
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.createdBy.toString() !== req.user.id)
      return res.status(403).send("Unauthorized");

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.createdBy.toString() !== req.user.id)
      return res.status(403).send("Unauthorized");

    await job.deleteOne();
    res.send("Deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};