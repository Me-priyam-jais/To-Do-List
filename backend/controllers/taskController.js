import mongoose from "mongoose";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Task } from "../models/taskModel.js";

export const addTask = async (req, res, next) => {
  const { user } = req;
  const { title, deadline, description, status } = req.body;
  if (!title) {
    return next(new ErrorHandler("Provide Task Name first.", 400));
  }
  const newTask = new Task({
    title,
    deadline,
    description,
    status: false,
  });
  await newTask.save();
  user.tasks.push(newTask._id);
  await user.save();
  res.status(200).json({
    success: true,
    message: "Task Added Successfully.",
  });
};

export const getTask = async (req, res, next) => {
  const { taskID } = req.params;
  // no need of this ,mongoose automatically handles the invalid _id error but it is still there.
  if (!taskID) {
    return next(new ErrorHandler("task ID is required", 400));
  }
  const ownsTask = req.user.tasks.some((id) => id.toString() === taskID);
  if (!ownsTask) {
    return next(new ErrorHandler("No Task with such ID.", 404));
  }
  const task = await Task.findById(taskID);
  if (!task) {
    return next(new ErrorHandler("No Task with such ID.", 400));
  }
  return res.status(200).json({
    success: true,
    task,
  });
};

export const getTasks = async (req, res, next) => {
  const user = req.user;
  const { tasks } = await user.populate("tasks");
  return res.status(200).json({
    success: true,
    tasks,
    message: "got all the tasks.",
  });
};

export const deleteTask = async (req, res, next) => {
  const { taskID } = req.params;
  const ownsTask = req.user.tasks.some((id) => id.toString() === taskID);
  if (!ownsTask) {
    return next(new ErrorHandler("No such task exists to delete.", 404));
  }
  const deletedTask = await Task.findByIdAndDelete(taskID);
  if (!deletedTask) {
    return next(
      new ErrorHandler("No such task exists with this ID to delete."),
    );
  }
  await req.user.updateOne({ $pull: { tasks: taskID } });
  res.status(200).json({
    success: true,
    deletedTask,
    message: " Task  removed successfully.",
  });
};
export const toggleTaskStatus = async (req, res, next) => {
  const { taskID } = req.params;
  const ownsTask = req.user.tasks.some((id) => id.toString() === taskID);
  if (!ownsTask) {
    return next(new ErrorHandler("No such task exists.", 404));
  }
  const task = await Task.findById(taskID);
  if (!task) {
    return next(new ErrorHandler("No such task exists.", 404));
  }
  task.status = !task.status;
  await task.save();
  res.status(200).json({
    success: true,
    message: "Task status updated successfully.",
  });
};
export const updateTask = async (req, res, next) => {
  const { taskID } = req.params;
  if (!req.body) {
    return next(
      new ErrorHandler("Provide the required body for the request first.", 400),
    );
  }
  const { title, deadline, description } = req.body;
  if (!title) {
    return next(new ErrorHandler("Provide the Title to update the task.", 200));
  }

  const ownsTask = req.user.tasks.some((id) => id.toString() === taskID);
  if (!ownsTask) {
    return next(new ErrorHandler("No such task exists to update.", 404));
  }
  const updatedTask = await Task.findByIdAndUpdate(
    taskID,
    { title: title, deadline: deadline, description: description },
    { new: true, runValidators: true },
  );
  if (!updatedTask) {
    return next(
      new ErrorHandler("there is no task to update with such id.", 400),
    );
  }
  return res.status(200).json({
    success: true,
    updatedTask,
    message: "Task Updated Successfully.",
  });
};

export const clearCompleted = async (req, res, next) => {
  const user = req.user;
  const { tasks } = await user.populate("tasks");

  const unCompletedTask = tasks
    .filter((task) => task.status === false)
    .map((task) => task._id);

  user.tasks = unCompletedTask;
  await user.save();

  const tasksToDelete = tasks
    .filter((task) => task.status === true)
    .map((task) => task._id);
  if(tasksToDelete.length ===0){
   return next(new ErrorHandler("No task is completed.",400))
  }
  await Task.deleteMany({ _id: { $in: tasksToDelete } });

  res.status(200).json({
    success: true,
    message: "cleared all completed tasks",
    tasks: unCompletedTask,
  });
};
