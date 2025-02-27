



// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const adminRoutes = require("./routes/admin"); // Import admin routes

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors()); // Allow frontend requests

// // Connect to MongoDB without deprecated options
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Mount admin routes
// app.use("/admin", adminRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin"); // Verify the path

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected yes"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Mount the admin routes under "/admin"
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
