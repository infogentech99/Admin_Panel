const express = require("express");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Get users assigned to the logged-in Leader (Paginated)
router.get("/assigned-users", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "leader") {
            return res.status(403).json({ message: "Access denied. Only Leaders can view assigned users." });
        }

        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // Fetch assigned users with pagination
        const users = await User.find({ leaderId: req.user.id })
            .skip(skip)
            .limit(parseInt(limit));

        // Count total assigned users
        const totalUsers = await User.countDocuments({ leaderId: req.user.id });

        res.json({
            assignedUsers: users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error("Error fetching assigned users:", error);
        res.status(500).json({ message: "Error fetching assigned users", error });
    }
});

// Get details of the logged-in Leader
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "leader") {
            return res.status(403).json({ message: "Access denied. Only Leaders can access their profile." });
        }

        const leader = await User.findById(req.user.id).select("-password");
        res.json(leader);
    } catch (error) {
        console.error("Error fetching leader profile:", error);
        res.status(500).json({ message: "Error fetching profile", error });
    }
});

module.exports = router;
