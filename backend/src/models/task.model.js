import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
