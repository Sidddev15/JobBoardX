// Express Server

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5000;

// connectDB
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", require("./routes/testRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/protected", require("./routes/testProtected"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api`);
});