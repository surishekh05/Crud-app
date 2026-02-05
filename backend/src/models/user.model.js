import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  // password is always hashed (never store plain!)
  password: { type: String, required: true }
});

export default mongoose.model("User", userSchema);
