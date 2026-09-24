import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  addTask,
  clearCompleted,
  deleteTask,
  getTask,
  getTasks,
  toggleTaskStatus,
  updateTask,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.post(
  "/add",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(addTask),
);
taskRouter.put(
  "/toggle/status/:taskID",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(toggleTaskStatus),
);
taskRouter.get(
  "/:taskID",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(getTask),
);
taskRouter.get(
  "/user/tasks",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(getTasks),
);
taskRouter.put(
  "/update/:taskID",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(updateTask),
);
taskRouter.delete(
  "/delete/:taskID",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(deleteTask),
);
taskRouter.delete(
  "/clear/completed",
  catchAsyncErrors(isAuthenticated),
  catchAsyncErrors(clearCompleted),
);

export default taskRouter;
