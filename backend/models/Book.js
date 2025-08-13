import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: String,
    status: { type: String, enum: ["Read", "Unread"], default: "Unread" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Book", bookSchema);


