
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "leader"] },
  status: { type: String, required: true, enum: ["active", "inactive"] },
});

module.exports = mongoose.model("User", UserSchema);
