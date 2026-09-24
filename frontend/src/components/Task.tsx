import UpdateTask from "./UpdateTask";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteTask, toggleTaskStatus } from "../store/slices/taskSlice";
import type { Task } from "../types/task";

interface TaskProps {
  task: Task;
}
export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tasks);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

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
          <p className="text-xs text-gray-400 ">{task?.deadline}</p>
        </div>
      </div>

      <button
        className="text-xs px-3 py-1 rounded-full"
        disabled={loading?true:false}
        onClick={() => {
          setIsUpdateOpen(true);
        }}
      >
        update
      </button>
        
      <button className="text-xs px-3 py-1 rounded-full" onClick={()=>{
        dispatch(deleteTask(task._id));
      }} 
      disabled={loading?true:false}>delete</button>
      {isUpdateOpen && (
        <UpdateTask task={task} onClose={() => setIsUpdateOpen(false)} />
      )}
      <button className="text-xs px-3 py-1 rounded-full text-red-700"></button>
      <span
        className={`text-xs  ${task.status ? "text-green-600 bg-green-100" : "text-yellow-600 bg-yellow-100"} px-3 py-1 rounded-full`}
      >
        {task.status ? "Done" : "Pending"}
      </span>
    </div>
  );
}
