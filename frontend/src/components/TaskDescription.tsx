import type { Task } from "../types/task";

interface TaskDescriptionProps {
  task: Task;
  onClose: () => void;
}

export default function TaskDescription({
  task,
  onClose,
}: TaskDescriptionProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 p-4">
      <section
        aria-labelledby="task-description-title"
        aria-modal="true"
        className="w-full max-w-md rounded-xl bg-blue-100 p-6 shadow-2xl"
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              className="text-2xl font-semibold text-gray-800"
              id="task-description-title"
            >
              {task.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Task description</p>
          </div>
          <button
            aria-label="Close task description"
            className="h-10 w-8 rounded-sm border-2 border-gray-600 text-center text-xl font-semibold text-gray-800"
            onClick={onClose}
            type="button"
          >
            X
          </button>
        </div>
        <p className="mt-6 whitespace-pre-wrap break-words text-gray-700">
          {task.description?.trim() || "No description provided."}
        </p>
      </section>
    </div>
  );
}
