const express = require("express");
const User = require("../models/User");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Assign 10 Users to a Leader (Admin Only)
router.post("/assign-users", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { leaderId, userIds } = req.body;

        if (!leaderId || !userIds || userIds.length !== 10) {
            return res.status(400).json({ message: "Each leader must have exactly 10 users." });
        }

        // Check if the Leader exists and has the correct role
        const leader = await User.findById(leaderId);
        if (!leader || leader.role !== "leader") {
            return res.status(404).json({ message: "Leader not found or invalid role." });
        }

        // Ensure the Leader is not already assigned 10 users
        const assignedUsers = await User.countDocuments({ leaderId });
        if (assignedUsers >= 10) {
            return res.status(400).json({ message: "This leader already has 10 assigned users." });
        }

        // Check if all users exist and have the "user" role
        const users = await User.find({ _id: { $in: userIds }, role: "user" });
        if (users.length !== 10) {
            return res.status(400).json({ message: "Some users are invalid or already assigned to a leader." });
        }

        // Assign users to the leader
        await User.updateMany(
            { _id: { $in: userIds } },
            { $set: { leaderId } }
        );

        res.json({ message: "Users assigned to leader successfully!" });
    } catch (error) {
        console.error("Error assigning users:", error);
        res.status(500).json({ message: "Error assigning users", error });
    }
});

// Get Users List (Admin Only, with optional pagination)
router.get("/get-users", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { role, page = 1, limit = 10 } = req.query;
        const query = role ? { role } : {};

        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalUsers = await User.countDocuments(query);

        res.json({ users, totalPages: Math.ceil(totalUsers / limit), currentPage: parseInt(page) });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// Get Users Assigned to a Leader (Leader Only)
router.get("/leader/assigned-users", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "leader") {
            return res.status(403).json({ message: "Access denied. Only Leaders can view assigned users." });
        }

        const users = await User.find({ leaderId: req.user.id });
        res.json(users);
    } catch (error) {
        console.error("Error fetching assigned users:", error);
        res.status(500).json({ message: "Error fetching assigned users", error });
    }
});

module.exports = router;
