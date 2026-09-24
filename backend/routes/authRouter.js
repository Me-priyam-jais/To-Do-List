import {
  forgotPasssword,
  getUser,
  login,
  logout,
  resetPassword,
  signup,
  updatePassword,
  verifyOTP,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { Router } from "express";

const authRouter = Router();
authRouter.post("/signup", catchAsyncErrors(signup));
authRouter.post("/verify-otp", catchAsyncErrors(verifyOTP));
authRouter.post("/login", catchAsyncErrors(login));
authRouter.post(
  "/get",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(getUser),
);
authRouter.get(
  "/logout",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(logout),
);
authRouter.put("/password/forgot", catchAsyncErrors(forgotPasssword));
authRouter.put(
  "/password/reset/:resetPasswordToken",
  catchAsyncErrors(resetPassword),
);
authRouter.put(
  "/password/update",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(updatePassword),
);

export default authRouter;
