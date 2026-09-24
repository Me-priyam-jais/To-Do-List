import { config } from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./Database/db.js";
import { User } from "./models/userModel.js";
import { Task } from "./models/taskModel.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import taskRouter from "./routes/taskRouter.js";

config({ path: "./config/config.env" });
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECREAT_STRING));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }),
);
app.use("/auth", authRouter);
app.use("/task", taskRouter);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT || 8000, () => {
      console.log("Hey I am Listening.");
    });
  } catch (error) {
    console.log("Failed to start server",error);
    process.exit(1);
  }
};

startServer();
