const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// only logged in user can access
router.get("/profile",authMiddleware, (req,res) => {
    res.json({ message: `Welcome User ${req.user.id}` })
});

// only admin 
router.get("/admin", authMiddleware, roleMiddleware("admin"), (req,res) => {
    res.json({ message: "Admin dashboard access granted" });
});

// only recruiter
router.get("/recruiter", authMiddleware, roleMiddleware("recruiter"), (req,res) => {
    res.json({ message: "Recruiter Dashboard access granted" });
});

// only candidate
router.get("/candidate", authMiddleware, roleMiddleware("candidate"), (req, res) => {
    res.json({ message: "Candidate dashboard access granted" });
});

module.exports = router;
//This gives you role-specific endpoints to test whether your access control works before building actual job dashboard APIs.    