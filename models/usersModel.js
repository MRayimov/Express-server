import mongoose from "mongoose";
import bcrypt from "bcrypt";
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

usersSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

export const Users = mongoose.model("users", usersSchema);
