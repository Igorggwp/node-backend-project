import mongoose from "mongoose";
import crypro from "../utils/crypto.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true, min: 2, max: 60, },
  password: { type: String, required: true, },
}, {
  versionKey: false,
  timestamps: true,
});

userSchema.pre("save", function(next, options) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    user.password = crypro(user.password);
    next();
  } catch(err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
