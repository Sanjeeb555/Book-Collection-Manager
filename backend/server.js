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

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/testdb", async (req, res) => {
    try {
        await mongoose.connection.db.collection("test").insertOne({ msg: "Hello from backend" });
        const docs = await mongoose.connection.db.collection("test").find().toArray();
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/test", (req, res) => {
    res.json({ message: "Frontend is connected to Backend ✅" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
