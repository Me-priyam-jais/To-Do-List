export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  const isProduction = process.env.FRONTEND_URL?.startsWith("https://");
  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    accountVerified: user.accountVerified,
    tasks: user.tasks,
  };
  res
    .status(statusCode)
    .cookie("loginToken", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    .json({
      success: true,
      user: safeUser,
      message,
    });
};
