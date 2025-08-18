import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS: allow both local dev & GitHub Pages
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://sanjeeb555.github.io" // your GitHub Pages site
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// ✅ DB test route
app.get("/testdb", async (req, res) => {
  try {
    await mongoose.connection.db
      .collection("test")
      .insertOne({ msg: "Hello from backend" });
    const docs = await mongoose.connection.db
      .collection("test")
      .find()
      .toArray();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend is connected to Backend ✅" });
});

// ✅ Fallback port for Render/Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});