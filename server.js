



// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const adminRoutes = require("./routes/admin"); // Verify the path

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected yes"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Mount the admin routes under "/admin"
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

// Enable CORS for a specific frontend origin
app.use(
  cors({
    origin: "https://adminn-paanel.vercel.app",  // Allow this frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allow these HTTP methods
    credentials: true,  // Allow cookies and other credentials to be sent
  })
);

app.use(express.json());

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
