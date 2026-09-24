import { User } from "../models/userModel.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { loginToken } = req.cookies;
  if (!loginToken) {
    return next(new ErrorHandler("User is not authenticated.", 400));
  }
  const decoded = jwt.verify(loginToken, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id).select(
    "-password -verificationCode -resetPasswordToken",
  );
  if (!user) {
    return next(new ErrorHandler("User no longer exists.", 401));
  }
  if (
    user.passwordUpdatedAt &&
    user.passwordUpdatedAt.getTime() / 1000 > decoded.iat
  ) {
    return next(
      new ErrorHandler(
        "Password was changed , login with the new password.",
        401,
      ),
    );
  }
  req.user = user;
  next();
};
