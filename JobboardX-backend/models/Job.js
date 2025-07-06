const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description: String, 
    company: String, 
    location: String,
    salaryRange: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps: true});

module.exports = mongoose.model("Job", jobSchema);

//This defines a job with who created it (createdBy) and who applied (applicants), setting up many-to-many relations.