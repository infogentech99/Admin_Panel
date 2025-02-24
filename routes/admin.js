const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import your User model

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

// ✅ Fetch all users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
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

// // ✅ User Login API (for role "user")
// router.post("/user-leader-login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, role: "user" });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials or not authorized as user" });
//     }
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     res.status(200).json({ message: "User login successful", user });
//   } catch (error) {
//     console.error("User login error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });


// router.post("/user-leader-login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Check for a user whose role is either "user" or "leader"
//     const user = await User.findOne({ username, role: { $in: ["user", "leader"] } });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials or not authorized" });
//     }
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });



// User/Leader Login API (single endpoint)
router.post("/user-leader-login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find a user whose role is either "user" or "leader"
    const user = await User.findOne({ username, role: { $in: ["user", "leader"] } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials or not authorized." });
    }
    // Compare passwords (plain text for demo; use hashed passwords in production)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



// // ✅ Leader Login API (for role "leader")
// router.post("/leader-login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const leader = await User.findOne({ username, role: "leader" });
//     if (!leader) {
//       return res.status(401).json({ message: "Invalid credentials or not authorized as leader" });
//     }
//     if (leader.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     res.status(200).json({ message: "Leader login successful", leader });
//   } catch (error) {
//     console.error("Leader login error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });



// router.post("/leader-login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Find a user with role "leader"
//     const leader = await User.findOne({ username, role: "leader" });
//     if (!leader) {
//       return res
//         .status(401)
//         .json({ message: "Invalid credentials or not authorized as leader" });
//     }
//     // Compare passwords (for demo purposes, plain text comparison)
//     if (leader.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     res.status(200).json({ message: "Leader login successful", leader });
//   } catch (error) {
//     console.error("Leader login error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });


module.exports = router;
