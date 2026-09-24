import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch } from "../store/hooks";
import { updateTask } from "../store/slices/taskSlice";
import type { Task } from "../types/task";

interface UpdateTaskProps {
  task: Task;
  onClose: () => void;
}
export default function UpdateTask({ task, onClose }: UpdateTaskProps) {
  const [updatedToTask, setUpdatedToTask] = useState<Task>(task);
  const dispatch = useAppDispatch();

  const handleTaskChanges = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUpdatedToTask((prevUpdatedToTask) => ({
      ...prevUpdatedToTask,
      [name]: value,
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const succeeded = await dispatch(
      updateTask(updatedToTask, updatedToTask._id),
    );
    if (succeeded) {
      onClose();
    }
  }
  return (
    <div className="fixed inset-0  overscroll-y-contain bg-black/30 flex items-center justify-center overlay-y-auto">
      <div className=" bg-blue-100 w-11/12 max-w-md  rounded-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-2xl text-gray-800">Update Task</p>
            <p className=" text-sm text-gray-500 mt-1">
              update a task and stay organized
            </p>
          </div>
          <button
            className="text-xl h-10 text-gray-800 font-semibold  border-2 w-8 rounded-sm border-gray-600 text-center"
            onClick={() => {
              onClose();
            }}
          >
            X
          </button>
        </div>
        <div>
          <form action="/task-list" onSubmit={handleSubmit}>
            <input
              className="block h-7 p-2 my-10 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2"
              type="text"
              name="title"
              placeholder="Task Tittle"
              value={updatedToTask.title}
              onChange={handleTaskChanges}
            />
            <input
              className="block h-7 p-2 my-10 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2"
              type="text"
              name="deadline"
              placeholder="Task Deadline (Optional)"
              value={updatedToTask.deadline}
              onChange={handleTaskChanges}
            />

            <textarea
              name="description"
              className="block  p-2 my-10 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 h-16"
              placeholder="About the Task"
              value={updatedToTask.description}
              onChange={handleTaskChanges}
            ></textarea>
            <div className="flex justify-center items-center">
              <input
                className="w-26 h-8 bg-blue-500 rounded-md"
                type="submit"
                value="Update Task"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
