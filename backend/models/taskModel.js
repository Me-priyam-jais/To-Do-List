import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: String },
  description: { type: String },
  status: { type: Boolean, default: false },
});

export const Task = mongoose.model("Task", taskSchema);
