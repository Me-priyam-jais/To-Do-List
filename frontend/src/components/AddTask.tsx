import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addTask } from "../store/slices/taskSlice";
import { toggleAddTaskPopUp } from "../store/slices/popUpSlice";
import type { Task } from "../types/task";

export type { Task };
export type task = Task;

export default function AddTask() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tasks);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    deadline: "",
    description: "",
    status: false,
  });


  function handleNewTaskChanges(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    // function to handle changes in a particular new task.
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const succeeded = await dispatch(addTask(newTask));
    if (succeeded) {
      dispatch(toggleAddTaskPopUp());
    }
  }
  return (
    <div className="fixed inset-0  overscroll-y-contain bg-black/30 flex items-center justify-center overlay-y-auto">
      <div className=" bg-blue-100 w-11/12 max-w-md  rounded-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-2xl text-gray-800">
              Add a new Task
            </p>
            <p className=" text-sm text-gray-500 mt-1">
              create a task and stay organized
            </p>
          </div>
          <button
            className="text-xl h-10 text-gray-800 font-semibold  border-2 w-8 rounded-sm border-gray-600 text-center"
            onClick={() => {
              dispatch(toggleAddTaskPopUp());
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
              onChange={handleNewTaskChanges}
              value={newTask.title}
            />
            <input
              className="block h-7 p-2 my-10 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2"
              type="text"
              name="deadline"
              placeholder="Task Deadline (Optional)"
              onChange={handleNewTaskChanges}
              value={newTask.deadline}
            />

            <textarea
              name="description"
              className="block  p-2 my-10 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 h-16"
              placeholder="About the Task"
              onChange={handleNewTaskChanges}
              value={newTask.description}
            ></textarea>
            <div className="flex justify-center items-center">
              <input
                className="w-26 h-8 bg-blue-500 rounded-md"
                type="submit"
                value="Add Task"
                disabled={loading ? true : false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
