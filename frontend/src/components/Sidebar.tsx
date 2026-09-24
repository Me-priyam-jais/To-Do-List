import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../store/slices/authSlice";
import { makeTasksEmpty } from "../store/slices/taskSlice";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleLogout =  () => {
     dispatch(logOut());
     dispatch(makeTasksEmpty());
    navigate("/");
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open user menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="text-sm font-bold" aria-hidden="true">{user && user.name.charAt(0)}</span>
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close user menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30"
        />
      )}

      <aside
        aria-label="User menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-blue-600 p-5 text-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-bold text-blue-600">
            ✓
          </span>
          <span className="text-xl font-semibold">TaskFlow</span>
        </Link>
          <button
            type="button"
            aria-label="Close user menu"
            onClick={() => setIsOpen(false)}
            className="text-2xl leading-none text-blue-100 hover:text-white"
          >
            x
          </button>
        </div>

        <div className="mt-8 border-b border-blue-400 pb-5">
          <p className="text-sm text-blue-100">Signed in as</p>
          <p className="mt-1 truncate font-medium">
            {user?.name || user?.email || "Your account"}
          </p>
        </div>

        <nav className="mt-6 flex flex-col gap-3">
        <Link
          to="/task/list"
          onClick={() => setIsOpen(false)}
          className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium hover:bg-blue-400"
        >
          My tasks
        </Link>
        <Link
          to={`/password/update/${encodeURIComponent(user?.email || "")}`}
          onClick={() => setIsOpen(false)}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-blue-100 hover:bg-blue-500 hover:text-white"
        >
          Update password
        </Link>
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="mt-auto w-full rounded-lg border border-blue-300 px-4 py-2.5 text-left text-sm font-medium text-blue-100 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging out..." : "Log out"}
        </button>
      </aside>
    </>
  );
}