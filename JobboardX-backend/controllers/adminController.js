const User = require("../models/User");
const Job = require("../models/Job");

// Get all users
exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find({}, "-password"); //exclude password
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Change user role
exports.UpdateUserRole = async(req,res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({ message: "User not found" });

        user.role = role;
        await user.save();

        res.json({ message: "Role Updated", user });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Dashboard Stats
exports.getDashboardStats = async(req,res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Job.aggregate([
            {$project: {applicantCount: { $size: "$applicants" }}},
            {$group: { _id: null, total: {$sum: "$applicantCount"} }}
        ]);
        res.json({
            totalUsers,
            totalJobs,
            totalApplications: totalApplications[0]?.total || 0
        });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// We use aggregation in Job.aggregate() to sum total applicants
// "-password" projection excludes sensitive data when sending user list