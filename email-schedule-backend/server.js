require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();


const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors({
  origin: "https://future-blink-email-schedule-client.vercel.app", // Allow frontend URL
  credentials: true  // Allow cookies & authentication headers
}));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/email", emailRoutes);
app.use("/user", authRoutes);

app.get("/",(req,res)=>{
  res.json({message:"hellow world backend"})
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err.message));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
