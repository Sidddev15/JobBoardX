const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// must be admin to access all the routes 
router.use(auth, role("admin"));

router.get("/users", adminController.getAllUsers);
router.patch("/user/:id", adminController.UpdateUserRole);
router.get("/stats", adminController.getDashboardStats);

module.exports = router;

//  All routes are protected and admin-only.