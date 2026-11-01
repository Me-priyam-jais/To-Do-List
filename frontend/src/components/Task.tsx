import UpdateTask from "./UpdateTask";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteTask, toggleTaskStatus } from "../store/slices/taskSlice";
import type { Task } from "../types/task";
import { formatTaskDeadline } from "../utils/taskDeadline";
import TaskDescription from "./TaskDescription";

interface TaskProps {
  task: Task;
}
export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tasks);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md duration-300">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.status}
          className="w-5 h-5 accent-blue-500"
          onChange={() => {
            dispatch(toggleTaskStatus(task._id));
          }}
          disabled={loading ? true : false}
        />

        <div className="flex-col  justify-center items-center">
          <p className="text-gray-700 font-medium">{task?.title}</p>
          <p className="text-xs text-gray-400 ">
            {formatTaskDeadline(task.deadline)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="group relative">
          <button
            aria-label="View description"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-100 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => setIsDescriptionOpen(true)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12s3.5-6.25 9.75-6.25 9.75 6.25 9.75 6.25-3.5 6.25-9.75 6.25S2.25 12 2.25 12Z"
              />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            View description
          </span>
        </span>
        <span className="group relative">
          <button
            aria-label="Update task"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={() => setIsUpdateOpen(true)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 2.651 2.651M8 16l8.862-8.862m-10.9 10.9L8 16l8.862-8.862m-10.9 10.9 2.03-.51a2 2 0 0 0 .91-.52l10.26-10.26a2 2 0 0 0-2.83-2.83l-10.26 10.26a2 2 0 0 0-.52.91L5.96 18.04Z"
              />
            </svg>
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            Update
          </span>
        </span>
        <span className="group relative">
          <button
            aria-label="Delete task"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              dispatch(deleteTask(task._id));
            }}
            disabled={loading}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 7h12m-10 0 .7 12h6.6L16 7m-6-3h4l1 3H9l1-3Zm1 6v6m4-6v6"
              />
            </svg>
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            Delete
          </span>
        </span>
      </div>
      {isUpdateOpen && (
        <UpdateTask task={task} onClose={() => setIsUpdateOpen(false)} />
      )}
      {isDescriptionOpen && (
        <TaskDescription
          task={task}
          onClose={() => setIsDescriptionOpen(false)}
        />
      )}
      <span
        className={`text-xs  ${task.status ? "text-green-600 bg-green-100" : "text-yellow-600 bg-yellow-100"} px-3 py-1 rounded-full`}
      >
        {task.status ? "Done" : "Pending"}
      </span>
    </div>
  );
}
