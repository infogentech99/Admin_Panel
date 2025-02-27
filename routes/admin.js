const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import your User model

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");




router.post("/create-user", async (req, res) => {
  console.log("POST /admin/create-user called with body:", req.body);
  try {
    const { username, password, email, contact, role, status } = req.body;
    if (!username || !password || !email || !contact || !role || !status) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const newUser = new User({ username, password, email, contact, role, status });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});




// Define the assign leader endpoint
router.put("/assign-leader", async (req, res) => {
  const { leaderId, userIds } = req.body;
  if (!leaderId || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ message: "LeaderId and an array of userIds are required" });
  }
  try {
    // Update the users to assign the leaderId
    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { leaderId: leaderId } }
    );
    res.status(200).json({ message: "Users assigned to leader successfully", result });
  } catch (error) {
    console.error("Error assigning leader:", error);
    res.status(500).json({ message: "Error assigning leader", error: error.message });
  }
});


router.get("/get-users", async (req, res) => {
  console.log("GET /get-users route hit");
  try {
    const users = await User.find();
    console.log("Fetched Users:", users); // Debugging: Check passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});


// ✅ Update user
router.put("/update-user/:id", async (req, res) => {
  console.log("PUT /admin/update-user called with id:", req.params.id);
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// ✅ Delete user
router.delete("/delete-user/:id", async (req, res) => {
  console.log("DELETE /admin/delete-user called with id:", req.params.id);
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});



// // User/Leader Login API (single endpoint)
// router.post("/user-leader-login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Find a user whose role is either "user" or "leader"
//     const user = await User.findOne({ username, role: { $in: ["user", "leader"] } });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials or not authorized." });
//     }
//     // Compare passwords (plain text for demo; use hashed passwords in production)
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }
//     res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });



router.post("/user-leader-login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login Attempt for:", username, password);

  try {
      const user = await User.findOne({ username });

      if (!user) {
          console.log("User not found in DB");
          return res.status(401).json({ message: "User not found" });
      }

      console.log("Stored Password (hashed):", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match Status:", isMatch);

      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials." });
      }

      // Generate JWT Token
      const token = jwt.sign(
          { id: user._id, role: user.role },
          "YOUR_SECRET_KEY",
          { expiresIn: "1h" }
      );

      res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});



router.put("/assign-leader", async (req, res) => {
  const { leaderId, userIds } = req.body;
  if (!leaderId || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ message: "LeaderId and an array of userIds are required" });
  }
  try {
    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { leader: leaderId } }
    );
    res.status(200).json({ message: "Users assigned to leader successfully", result });
  } catch (error) {
    console.error("Error assigning leader:", error);
    res.status(500).json({ message: "Error assigning leader", error: error.message });
  }
});



module.exports = router;






// // routes/admin.js
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User"); // Ensure this path is correct

// // Other admin routes...

// // Define the assign leader endpoint
// router.put("/assign-leader", async (req, res) => {
//   const { leaderId, userIds } = req.body;
//   if (!leaderId || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
//     return res.status(400).json({ message: "LeaderId and an array of userIds are required" });
//   }
//   try {
//     // Update the users to assign the leaderId
//     const result = await User.updateMany(
//       { _id: { $in: userIds } },
//       { $set: { leaderId: leaderId } }
//     );
//     res.status(200).json({ message: "Users assigned to leader successfully", result });
//   } catch (error) {
//     console.error("Error assigning leader:", error);
//     res.status(500).json({ message: "Error assigning leader", error: error.message });
//   }
// });

// module.exports = router;
