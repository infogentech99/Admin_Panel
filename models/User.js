
// // const mongoose = require("mongoose");

// // const UserSchema = new mongoose.Schema({
// //   username: { type: String, required: true },
// //   password: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   contact: { type: String, required: true },
// //   role: { type: String, required: true, enum: ["user", "leader"] },
// //   status: { type: String, required: true, enum: ["active", "inactive"] },
// // });

// // module.exports = mongoose.model("User", UserSchema);





// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const UserSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, trim: true },
//     password: { type: String, required: true },
//     email: { type: String, required: true, unique: true, trim: true },
//     contact: { type: String, required: true, trim: true },
//     role: { type: String, required: true, enum: ["user", "leader", "admin"], default: "user" },
//     status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
//     leaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Links user to assigned leader
//   },
//   { timestamps: true } // Automatically adds createdAt & updatedAt fields
// );

// // Hash password before saving the user
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password for login
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("User", UserSchema);




const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    contact: { type: String, required: true, trim: true },
    role: { 
      type: String, 
      required: true, 
      enum: ["user", "leader", "admin"], 
      default: "user" 
    },
    status: { 
      type: String, 
      required: true, 
      enum: ["active", "inactive"], 
      default: "active" 
    },
    leaderId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      default: null 
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

// Pre-save hook to hash the password if modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare candidate password with stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Override toJSON method to remove sensitive fields when returning user objects
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
