// middleware/authenticateAdmin.js
const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.header("adminToken");

  if (!token) {
    return res
      .status(401)
      .json({ message: "❌ Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified.role !== "admin") {
      return res
        .status(403)
        .json({ message: "❌ Not Authorized: Admin Access Required" });
    }

    req.admin = verified;
    next();
  } catch (err) {
    console.error("❌ Invalid Token", err);
    return res.status(400).json({ message: "❌ Invalid Token" });
  }
};

module.exports = authenticateAdmin;
