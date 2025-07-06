//Basic test Routes
const express = require("express");
const router =  express.Router();

router.get("/", (req,res) => {
    res.send("JobBoard API is up and running!");
});

module.exports = router;
