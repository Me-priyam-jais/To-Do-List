import Task from "../components/Task";
import AddTask from "../components/AddTask";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Task as TaskModel } from "../types/task";
import { toggleAddTaskPopUp } from "../store/slices/popUpSlice";
import {
  clearCompletedTasks,
  fetchAllTasks,
  resetTaskSlice,
} from "../store/slices/taskSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar.tsx";
import { Navigate } from "react-router-dom";

export default function List() {
  const dispatch = useAppDispatch();
  const { addTaskPopUp } = useAppSelector((state) => state.popup);
  const { tasks, loading, error, message } = useAppSelector(
    (state) => state.tasks,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchAllTasks());
    }
  }, [ dispatch,isAuthenticated]);

  useEffect(()=>{
    if (message) {
      toast.success(message);
      dispatch(fetchAllTasks());
      dispatch(resetTaskSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetTaskSlice());
    }
  },[dispatch,error,message])
  const allTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task: TaskModel) => task.status === true,
  ).length;
  const todaysProgress =
    allTasks === 0 ? 0 : Math.floor((completedTasks / allTasks) * 100);
    if(!isAuthenticated){
      return <Navigate to="/" />
    }
  return (
    <div className="min-h-screen bg-blue-50">
      <Sidebar />
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl rounded-xl bg-blue-100 p-6 shadow-lg shadow-blue-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              My To-Do List
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Stay organized and get things done.
            </p>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => {
              dispatch(toggleAddTaskPopUp());
            }}
          >
            + Add Task
          </button>
        </div>
        {addTaskPopUp && <AddTask />}

        {/* Progress */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Today's Progress</span>
            <span className="text-blue-500 font-medium">
              {completedTasks}/{allTasks} completed
            </span>
          </div>

          <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-blue-500 rounded-full`}
              style={{ width: `${todaysProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <Task key={task?._id} task={task} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-7 pt-4 border-t border-blue-200 flex justify-between text-sm">
          <p className="text-gray-500">
            {allTasks - completedTasks} tasks remaining
          </p>

          <button
            className="text-blue-500 hover:text-blue-700 duration-200"
            disabled={loading?true:false}
            onClick={() => {
              dispatch(clearCompletedTasks());
            }}
          >
            Clear completed
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}
