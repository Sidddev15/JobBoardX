const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        unique: true, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    role: {
        type: String, 
        enum: ["admin", "recruiter", "candidate"],
        default: "candidate",
    },
}, {timestamps: true});

// Hash password before saving
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bycrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;