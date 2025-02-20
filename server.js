// // // // // // const express = require("express");
// // // // // // const mongoose = require("mongoose");
// // // // // // const cors = require("cors");
// // // // // // const bcrypt = require("bcryptjs");
// // // // // // const jwt = require("jsonwebtoken");
// // // // // // require("dotenv").config();

// // // // // // const app = express();
// // // // // // app.use(express.json());
// // // // // // app.use(cors());

// // // // // // mongoose.connect(process.env.MONGO_URI, {
// // // // // //   useNewUrlParser: true,
// // // // // //   useUnifiedTopology: true,
// // // // // // });

// // // // // // const UserSchema = new mongoose.Schema({
// // // // // //   username: String,
// // // // // //   password: String,
// // // // // //   role: String, // 'admin' or 'user'
// // // // // // });

// // // // // // const User = mongoose.model("User", UserSchema);

// // // // // // // Admin Login
// // // // // // app.post("/admin/login", async (req, res) => {
// // // // // //   const { username, password } = req.body;
// // // // // //   const admin = await User.findOne({ username, role: "admin" });
// // // // // //   if (!admin || !(await bcrypt.compare(password, admin.password))) {
// // // // // //     return res.status(401).json({ message: "Invalid credentials" });
// // // // // //   }
// // // // // //   const token = jwt.sign(
// // // // // //     { id: admin._id, role: "admin" },
// // // // // //     process.env.JWT_SECRET
// // // // // //   );
// // // // // //   res.json({ token });
// // // // // // });

// // // // // // // Create User (Admin Only)
// // // // // // app.post("/admin/create-user", async (req, res) => {
// // // // // //   const { username, password } = req.body;
// // // // // //   const hashedPassword = await bcrypt.hash(password, 10);
// // // // // //   const newUser = new User({
// // // // // //     username,
// // // // // //     password: hashedPassword,
// // // // // //     role: "user",
// // // // // //   });
// // // // // //   await newUser.save();
// // // // // //   res.json({ message: "User created successfully" });
// // // // // // });

// // // // // // // User Login
// // // // // // app.post("/user/login", async (req, res) => {
// // // // // //   const { username, password } = req.body;
// // // // // //   const user = await User.findOne({ username, role: "user" });
// // // // // //   if (!user || !(await bcrypt.compare(password, user.password))) {
// // // // // //     return res.status(401).json({ message: "Invalid credentials" });
// // // // // //   }
// // // // // //   const token = jwt.sign(
// // // // // //     { id: user._id, role: "user" },
// // // // // //     process.env.JWT_SECRET
// // // // // //   );
// // // // // //   res.json({ token });
// // // // // // });

// // // // // // app.listen(5000, () => console.log("Server running on port 5000"));





// // // // // // Backend (Node.js + Express)
// // // // // // Install dependencies: npm install express mongoose bcryptjs jsonwebtoken cors dotenv

// // // // // require('dotenv').config();
// // // // // const express = require('express');
// // // // // const mongoose = require('mongoose');
// // // // // const cors = require('cors');
// // // // // const bcrypt = require('bcryptjs');
// // // // // const jwt = require('jsonwebtoken');

// // // // // const app = express();
// // // // // app.use(express.json());
// // // // // app.use(cors());

// // // // // // Database Connection
// // // // // mongoose
// // // // //   .connect("MONGO_URI", {
// // // // //     useNewUrlParser: true,
// // // // //     useUnifiedTopology: true,
// // // // //   })
// // // // //   .then(() => console.log("MongoDB Connected"))
// // // // //   .catch((err) => console.log(err));

// // // // // // Models
// // // // // const UserSchema = new mongoose.Schema({
// // // // //     username: String,
// // // // //     password: String,
// // // // // });
// // // // // const User = mongoose.model('User', UserSchema);

// // // // // // Middleware
// // // // // const verifyAdmin = (req, res, next) => {
// // // // //     const token = req.header('adminToken');
// // // // //     if (!token) return res.status(401).json({ message: 'Access Denied' });
// // // // //     try {
// // // // //         const verified = jwt.verify(token, process.env.JWT_SECRET);
// // // // //         req.admin = verified;
// // // // //         next();
// // // // //     } catch (err) {
// // // // //         res.status(400).json({ message: 'Invalid Token' });
// // // // //     }
// // // // // };

// // // // // // Routes
// // // // // // Admin Login
// // // // // app.post('/admin/login', (req, res) => {
// // // // //     const { username, password } = req.body;
// // // // //     if (username === 'admin' && password === 'admin123') {
// // // // //         const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // // // //         res.json({ token });
// // // // //     } else {
// // // // //         res.status(400).json({ message: 'Invalid Credentials' });
// // // // //     }
// // // // // });

// // // // // // Create User (Only Admin)
// // // // // app.post('/admin/create-user', verifyAdmin, async (req, res) => {
// // // // //     const { username, password } = req.body;
// // // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // // //     const newUser = new User({ username, password: hashedPassword });
// // // // //     await newUser.save();
// // // // //     res.json({ message: 'User Created Successfully' });
// // // // // });

// // // // // // User Login
// // // // // app.post('/user/login', async (req, res) => {
// // // // //     const { username, password } = req.body;
// // // // //     const user = await User.findOne({ username });
// // // // //     if (!user || !(await bcrypt.compare(password, user.password))) {
// // // // //         return res.status(400).json({ message: 'Invalid Credentials' });
// // // // //     }
// // // // //     const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // // // //     res.json({ token });
// // // // // });

// // // // // // Start Server
// // // // // const PORT = process.env.PORT || 5000;
// // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// // // // // Backend (Node.js + Express)
// // // // // Install dependencies: npm install express mongoose bcryptjs jsonwebtoken cors dotenv

// // // // require('dotenv').config();
// // // // const express = require('express');
// // // // const mongoose = require('mongoose');
// // // // const cors = require('cors');
// // // // const bcrypt = require('bcryptjs');
// // // // const jwt = require('jsonwebtoken');

// // // // const app = express();
// // // // app.use(express.json());
// // // // app.use(cors());

// // // // // Database Connection
// // // // mongoose
// // // //   .connect(process.env.MONGO_URI, {
// // // //     useNewUrlParser: true,
// // // //     useUnifiedTopology: true,
// // // //   })
// // // //   .then(() => console.log("MongoDB Connected"))
// // // //   .catch((err) => console.log(err));

// // // // // Models
// // // // const UserSchema = new mongoose.Schema({
// // // //     username: String,
// // // //     password: String,
// // // // });
// // // // const User = mongoose.model('User', UserSchema);

// // // // // Middleware
// // // // const verifyAdmin = (req, res, next) => {
// // // //     const token = req.header('adminToken');
// // // //     if (!token) return res.status(401).json({ message: 'Access Denied' });
// // // //     try {
// // // //         const verified = jwt.verify(token, process.env.JWT_SECRET);
// // // //         req.admin = verified;
// // // //         next();
// // // //     } catch (err) {
// // // //         res.status(400).json({ message: 'Invalid Token' });
// // // //     }
// // // // };

// // // // // Routes
// // // // // Admin Login (Params)
// // // // app.post('/admin/login/:username/:password', (req, res) => {
// // // //     const { username, password } = req.params;
// // // //     if (username === 'admin' && password === 'admin123') {
// // // //         const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // // //         res.json({ token });
// // // //     } else {
// // // //         res.status(400).json({ message: 'Invalid Credentials' });
// // // //     }
// // // // });

// // // // // Create User (Only Admin, Params)
// // // // app.post('/admin/create-user/:username/:password', verifyAdmin, async (req, res) => {
// // // //     const { username, password } = req.params;
// // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // //     const newUser = new User({ username, password: hashedPassword });
// // // //     await newUser.save();
// // // //     res.json({ message: 'User Created Successfully' });
// // // // });

// // // // // User Login (Params)
// // // // app.post('/user/login/:username/:password', async (req, res) => {
// // // //     const { username, password } = req.params;
// // // //     const user = await User.findOne({ username });
// // // //     if (!user || !(await bcrypt.compare(password, user.password))) {
// // // //         return res.status(400).json({ message: 'Invalid Credentials' });
// // // //     }
// // // //     const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // // //     res.json({ token });
// // // // });

// // // // // Start Server
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// // // // Backend (Node.js + Express)
// // // // Install dependencies: npm install express mongoose bcryptjs jsonwebtoken cors dotenv

// // // require('dotenv').config();
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require('cors');
// // // const bcrypt = require('bcryptjs');
// // // const jwt = require('jsonwebtoken');

// // // const app = express();
// // // app.use(express.json());
// // // app.use(cors());

// // // // Database Connection
// // // mongoose
// // //   .connect(process.env.MONGO_URI)
// // //   .then(() => console.log("✅ MongoDB Connected"))
// // //   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // // // Models
// // // const UserSchema = new mongoose.Schema({
// // //     username: { type: String, required: true, unique: true },
// // //     password: { type: String, required: true },
// // // });
// // // const User = mongoose.model('User', UserSchema);

// // // // Middleware: Verify Admin Token
// // // const verifyAdmin = (req, res, next) => {
// // //     const token = req.header('adminToken');
// // //     if (!token) return res.status(401).json({ message: '❌ Access Denied: No Token Provided' });

// // //     try {
// // //         const verified = jwt.verify(token, process.env.JWT_SECRET);
// // //         req.admin = verified;
// // //         next();
// // //     } catch (err) {
// // //         res.status(400).json({ message: '❌ Invalid Token' });
// // //     }
// // // };

// // // // Routes
// // // // Admin Login (Secure)
// // // app.post('/admin/login', (req, res) => {
// // //     const { username, password } = req.body;
// // //     if (username === 'admin' && password === 'admin123') {
// // //         const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // //         res.json({ token });
// // //     } else {
// // //         res.status(400).json({ message: '❌ Invalid Credentials' });
// // //     }
// // // });

// // // // Create User (Only Admin, Secure)
// // // app.post('/admin/create-user', verifyAdmin, async (req, res) => {
// // //     try {
// // //         const { username, password } = req.body;
// // //         if (!username || !password) {
// // //             return res.status(400).json({ message: "❌ Username and password are required" });
// // //         }

// // //         // Check if user already exists
// // //         const existingUser = await User.findOne({ username });
// // //         if (existingUser) {
// // //             return res.status(400).json({ message: "❌ User already exists" });
// // //         }

// // //         // Hash Password
// // //         const hashedPassword = await bcrypt.hash(password, 10);
// // //         const newUser = new User({ username, password: hashedPassword });

// // //         // Save User
// // //         await newUser.save();
// // //         res.json({ message: '✅ User Created Successfully' });
// // //     } catch (error) {
// // //         res.status(500).json({ message: "❌ Server Error", error: error.message });
// // //     }
// // // });

// // // // User Login (Secure)
// // // app.post('/user/login', async (req, res) => {
// // //     try {
// // //         const { username, password } = req.body;
// // //         if (!username || !password) {
// // //             return res.status(400).json({ message: "❌ Username and password are required" });
// // //         }

// // //         // Find User
// // //         const user = await User.findOne({ username });
// // //         if (!user || !(await bcrypt.compare(password, user.password))) {
// // //             return res.status(400).json({ message: '❌ Invalid Credentials' });
// // //         }

// // //         // Generate Token
// // //         const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // //         res.json({ token });
// // //     } catch (error) {
// // //         res.status(500).json({ message: "❌ Server Error", error: error.message });
// // //     }
// // // });

// // // // Start Server
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







// // require("dotenv").config();
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // const app = express();
// // app.use(express.json());
// // app.use(cors());

// // // Database Connection
// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // // Models
// // const UserSchema = new mongoose.Schema({
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// // });
// // const User = mongoose.model("User", UserSchema);

// // // Middleware: Verify Admin Token
// // const verifyAdmin = (req, res, next) => {
// //   const token = req.header("adminToken");
// //   if (!token)
// //     return res
// //       .status(401)
// //       .json({ message: "❌ Access Denied: No Token Provided" });

// //   try {
// //     const verified = jwt.verify(token, process.env.JWT_SECRET);
// //     req.admin = verified;
// //     next();
// //   } catch (err) {
// //     res.status(400).json({ message: "❌ Invalid Token" });
// //   }
// // };

// // // Routes
// // // Admin Login (Secure)
// // app.get("/admin/login/:username/:password", (req, res) => {
// //   const { username, password } = req.params;

// //   if (username === "admin" && password === "admin123") {
// //     const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });
// //     res.json({ token });
// //   } else {
// //     res.status(400).json({ message: "❌ Invalid Credentials" });
// //   }
// // });

// // // Create User (Only Admin, Secure)
// // app.get(
// //   "/admin/create-user/:username/:password",
// //   verifyAdmin,
// //   async (req, res) => {
// //     try {
// //       const { username, password } = req.params;

// //       // Check if user already exists
// //       const existingUser = await User.findOne({ username });
// //       if (existingUser) {
// //         return res.status(400).json({ message: "❌ User already exists" });
// //       }

// //       // Hash Password
// //       const hashedPassword = await bcrypt.hash(password, 10);
// //       const newUser = new User({ username, password: hashedPassword });

// //       // Save User
// //       await newUser.save();
// //       res.json({ message: "✅ User Created Successfully" });
// //     } catch (error) {
// //       res
// //         .status(500)
// //         .json({ message: "❌ Server Error", error: error.message });
// //     }
// //   }
// // );

// // // User Login (Secure)
// // app.get("/user/login/:username/:password", async (req, res) => {
// //   try {
// //     const { username, password } = req.params;

// //     // Find User
// //     const user = await User.findOne({ username });
// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //       return res.status(400).json({ message: "❌ Invalid Credentials" });
// //     }

// //     // Generate Token
// //     const token = jwt.sign(
// //       { username: user.username },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1h" }
// //     );
// //     res.json({ token });
// //   } catch (error) {
// //     res.status(500).json({ message: "❌ Server Error", error: error.message });
// //   }
// // });

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Models
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
// const User = mongoose.model("User", UserSchema);

// // Middleware: Verify Admin Token
// const verifyAdmin = (req, res, next) => {
//   const token = req.header("adminToken");
//   if (!token) return res.status(401).json({ message: "❌ Access Denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (verified.role !== "admin") {
//       return res.status(403).json({ message: "❌ Not Authorized" });
//     }
//     req.admin = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "❌ Invalid Token" });
//   }
// };

// // Admin Login (GET)
// app.get("/admin/login/:username/:password", (req, res) => {
//   const { username, password } = req.params;

//   if (username === "admin" && password === "admin123") {
//     const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
//   } else {
//     res.status(400).json({ message: "❌ Invalid Credentials" });
//   }
// });

// // Create User (Only Admin, Secure)
// app.post("/admin/create-user", verifyAdmin, async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "❌ User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     res.json({ message: "✅ User Created Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "❌ Server Error", error: error.message });
//   }
// });

// // // User Login (Only Allowed Users)
// // app.post("/user/login", async (req, res) => {
// //   try {
// //     const { username, password } = req.body;

// //     const user = await User.findOne({ username });
// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //       return res.status(400).json({ message: "❌ Invalid Credentials" });
// //     }

// //     const token = jwt.sign(
// //       { username: user.username },
// //       process.env.JWT_SECRET,
// //       {
// //         expiresIn: "1h",
// //       }
// //     );

// //     res.json({ token });
// //   } catch (error) {
// //     res.status(500).json({ message: "❌ Server Error", error: error.message });
// //   }
// // });



// app.post("/user/login", async (req, res) => {
//   console.log("Received request at /user/login", req.body); // Log request body

//   try {
//     const { username, password } = req.body;
//     console.log("Checking user:", username);

//     const user = await User.findOne({ username });
//     if (!user) {
//       console.log("❌ User not found");
//       return res.status(400).json({ message: "❌ Invalid Credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("❌ Incorrect Password");
//       return res.status(400).json({ message: "❌ Invalid Credentials" });
//     }

//     const token = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     console.log("✅ Login successful");
//     res.json({ token });
//   } catch (error) {
//     console.error("❌ Error:", error);
//     res.status(500).json({ message: "❌ Server Error", error: error.message });
//   }
// });


// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Middleware: Verify Admin Token
const verifyAdmin = (req, res, next) => {
  const token = req.header("adminToken");
  console.log("Received Admin Token:", token);

  if (!token)
    return res
      .status(401)
      .json({ message: "❌ Access Denied: No Token Provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", verified);

    if (verified.role !== "admin") {
      return res
        .status(403)
        .json({ message: "❌ Not Authorized: Admin Access Required" });
    }

    req.admin = verified;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(400).json({ message: "❌ Invalid Token" });
  }
};

// ✅ Admin Login (GET) - Returns an Admin Token
app.get("/admin/login/:username/:password", (req, res) => {
  const { username, password } = req.params;

  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("✅ Admin Login Successful. Token:", token);
    return res.json({ token });
  } else {
    return res.status(400).json({ message: "❌ Invalid Credentials" });
  }
});

// ✅ Create User (Only Admins)
app.post("/admin/create-user", verifyAdmin, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "❌ Username and Password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "❌ User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "✅ User Created Successfully" });
  } catch (error) {
    console.error("❌ Error Creating User:", error.message);
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
});

// ✅ User Login
app.post("/user/login", async (req, res) => {
  console.log("Received request at /user/login", req.body);

  try {
    const { username, password } = req.body;
    console.log("Checking user:", username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "❌ Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect Password");
      return res.status(400).json({ message: "❌ Invalid Credentials" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("✅ Login successful");
    res.json({ token });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
