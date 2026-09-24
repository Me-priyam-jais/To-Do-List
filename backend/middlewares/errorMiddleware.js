class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Invalid  ${err.path}`;
  }

  if (err.code === 11000) {
    err.statusCode = 409;
    err.message = `Duplicate Value for ${Object.keys(err.keyValue).join(", ")}.`;
  }

  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Invalid Authentication Token.";
  }

  if (err.name === "TokenExpiredError") {
    return next(new ErrorHandler("Token expired", 401));
  }

  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  const message = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")
    : err.message;

  return res.status(err.statusCode).json({
    status: false,
    message,
  });
};

export default ErrorHandler;
