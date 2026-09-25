import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userModel.js";
import argon2 from "argon2";
import { sendEmail } from "../utils/sendEmail.js";
import { userVerificationTemplateGenerator } from "../utils/userVerificationEmailTemplate.js";
import { userForgotPasswordEmailTemplate } from "../utils/userForgotPasswordEmailTemplate.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "node:crypto";

export const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const userEntries = await User.find({ email: email }).sort({
    createdAt: -1,
  });
  if (userEntries[0] && userEntries[0].accountVerified === true) {
    return next(new ErrorHandler(`An Account already exists with this email.`));
  }
  if (userEntries.length >= 5) {
    return next(
      new ErrorHandler(
        "You have reached to maximum number of attempts please try again later.",
        429,
      ),
    );
  }

  if (!email || !name || !password || !confirmPassword) {
    return next(new ErrorHandler("Provide all required fields.", 400));
  }

  if (name.length <= 3) {
    return next(
      new ErrorHandler("User Name must 4 characters long atleast.", 400),
    );
  }

  if (!email.endsWith("@gmail.com")) {
    return next(new ErrorHandler(" Provide a valid email format.", 400));
  }

  if (!(password.length >= 8 && password.length <= 16)) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400),
    );
  }

  if (confirmPassword !== password) {
    return next(
      new ErrorHandler("Password and confirm password do not match.", 400),
    );
  }

  const hashedPassword = await argon2.hash(password);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  const OTP = newUser.generateVerificationCode();
  await newUser.save();
  await sendEmail(
    email,
    "verify your account.",
    userVerificationTemplateGenerator(name, OTP,`${process.env.FRONTEND_URL}/verify-otp/${encodeURIComponent(email)}`),
  );

  res.status(200).json({
    success: true,
    message: `verification code sent to your gmail successfully.`,
  });
};

export const verifyOTP = async (req, res, next) => {
  const { email, OTP } = req.body;
  if (!email || !OTP) {
    return next(new ErrorHandler("Provide All the required Fields.", 400));
  }

  if (!email.endsWith("@gmail.com")) {
    return next(new ErrorHandler("Provide email in a valid format.", 400));
  }

  const userEntries = await User.find({ email: email }).sort({
    createdAt: -1,
  });

  if (userEntries.length === 0) {
    return next(
      new ErrorHandler(
        "no sign up with this email, sign up first to get OTP.",
        400,
      ),
    );
  }
  if (userEntries[0].accountVerified) {
    return next(new ErrorHandler("An Account Already exists with this email.", 400));
  }

  if (userEntries[0].verificationCodeExpire < Date.now()) {
    return next(
      new ErrorHandler(
        "Provided OTP is expired ,sign up again to get a new one.",
        403,
      ),
    );
  }
  const otp = String(OTP).trim();
  if (!/^\d{6}$/.test(otp)) {
  return next(new ErrorHandler("OTP must contain six digits", 400));
}
  if (otp !== String(userEntries[0].verificationCode)) {
    return next(new ErrorHandler("Invalid OTP.", 400));
  }
  userEntries[0].accountVerified = true;
  userEntries[0].verificationCode = null;
  userEntries[0].verificationCodeExpire = null;
  await userEntries[0].save();
  await User.deleteMany({ email: email, accountVerified: false });

  return res.status(200).json({
    success: true,
    message: "Your acount verified successfully.",
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Provide all requied entries.", 400));
  }

  if (!email.endsWith("@gmail.com")) {
    return next(new ErrorHandler("Provide email in a valid format.", 400));
  }

  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return next(new ErrorHandler(`no user found with this email `, 400));
  }

  if (!user.accountVerified) {
    return next(new ErrorHandler("Verify your account before log in.", 403));
  }

  const isPassCorrect = await argon2.verify(user.password, password);

  if (!isPassCorrect) {
    return next(new ErrorHandler("Incorrect email or Passsword.", 404));
  }

  sendToken(user, 200, "logged in successfully", res);
};

export const logout = async (req, res, next) => {
  const isProduction = process.env.FRONTEND_URL?.startsWith("https://");
  res
    .status(200)
    .cookie("loginToken", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
};

export const getUser = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const forgotPasssword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Provide  email first.", 400));
  }

  const user = await User.findOne({
    email: email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("Invalid Email.", 404));
  }

  const resetPasswordToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });
  const forgotPasswordEmailMessage = userForgotPasswordEmailTemplate(
    email,
    `${process.env.FRONTEND_URL}/password/reset/${resetPasswordToken}`,
  );
  try {
    await sendEmail(
      email,
      "For resetting password",
      forgotPasswordEmailMessage,
    );
    res.status(200).json({
      success: true,
      message: `An email send to ${email} to reset password`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler("Failed to send the email", 400));
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetPasswordToken } = req.params;

  if (!resetPasswordToken) {
    return next(
      new ErrorHandler(
        "Reset Password Token is requied to reset the password.",
        400,
      ),
    );
  }

  const hashedResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedResetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid Token or expired token.", 400));
  }

  const { newPassword, confirmNewPassword } = req.body;
  if (!newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Provide all the fields.", 400));
  }

  if (!(newPassword.length >= 8 && newPassword.length <= 16)) {
    return next(
      new ErrorHandler(
        "Password length must be between 8 and 16 characters.",
        400,
      ),
    );
  }
  if (newPassword != confirmNewPassword) {
    return next(
      new ErrorHandler("Password and Confirn password do not match.", 400),
    );
  }

  const hashedPassword = await argon2.hash(newPassword);
  user.password = hashedPassword;
  user.passwordUpdatedAt = Date.now();
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();
  sendToken(user, 200, "Password reset successfully", res);
};

export const updatePassword = async (req, res, next) => {
  const user = req.user;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Provide all required fields.", 400));
  }

  const isCurrentPasswordTrue = await argon2.verify(
    user.password,
    currentPassword,
  );
  if (!isCurrentPasswordTrue) {
    return next(new ErrorHandler("Current password is incorrect.", 400));
  }

  if (!(newPassword.length >= 8 && newPassword.length <= 16)) {
    return next(
      new ErrorHandler(
        "Password length must be between 8 and 16 characters.",
        400,
      ),
    );
  }
  if (newPassword != confirmNewPassword) {
    return next(
      new ErrorHandler("Password and Confirn password do not match.", 400),
    );
  }

  const hashedNewPassword = await argon2.hash(newPassword);
  user.password = hashedNewPassword;
  user.passwordUpdatedAt = Date.now();
  await user.save();
  return res.status(200).cookie("loginToken", "", {
    expires: new Date(0),
    httpOnly: true,
  }).json({
    success: true,
    message: "Password Updated successfully.",
  });
};
