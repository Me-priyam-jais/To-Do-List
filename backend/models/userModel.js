import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    accountVerified: { type: Boolean, default: false },
    tasks: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
      default: [],
    },
    verificationCode: String,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    passwordUpdatedAt: Date,
  },
  {
    timestamps: true,
  },
);
userSchema.methods.generateVerificationCode = function () {
  const OTP = crypto.randomInt(100000, 1000000).toString();
  this.verificationCode = OTP;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000;
  return OTP;
};

userSchema.methods.generateToken = function () {
  const jwtToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return jwtToken;
};

userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordToken = hashedResetToken;
  this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
export const User = mongoose.model("User", userSchema);
