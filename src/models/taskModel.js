import mongoose from "mongoose";
import { v4 } from "uuid";

const taskSchema = new mongoose.Schema({
  description: { type: String, unique: true, required: true, },
  done: { type: Boolean, required: true, },
  token: { type: String, unique: true, default: v4 }
}, {
  versionKey: false,
  timestamps: true,
});

const User = mongoose.model("Task", taskSchema);

export default User;
