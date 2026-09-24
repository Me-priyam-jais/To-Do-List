import {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import { resetAuthSlice } from "../store/slices/authSlice";

function Home() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useEffect(()=>{
    dispatch(resetAuthSlice())
  },[dispatch,isAuthenticated])
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            ✓
          </div>

          <p className="text-xl font-semibold text-gray-800">TaskFlow</p>
        </Link>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 duration-200"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-5">
        <div className="w-full max-w-4xl flex flex-col items-center">
          {/* Hero Section */}
          <div className="text-center max-w-2xl">
            <p className="text-blue-500 text-sm font-medium mb-3">
              SIMPLE · ORGANIZED · FOCUSED
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
              Organize your day.
              <br />
              <span className="text-blue-500">Get things done.</span>
            </h1>

            <p className="mt-5 text-gray-500 text-base md:text-lg">
              Keep your tasks organized, manage your priorities, and stay
              focused on what matters.
            </p>
          </div>

          {/* Conditional Card */}
          <div className="mt-10 w-full max-w-md">
            {isAuthenticated ? (
              /* Logged-in user */
              <div className="bg-blue-100 rounded-xl p-7 shadow-lg shadow-blue-200 text-center">
                <div className="w-14 h-14 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                  ✓
                </div>

                <p className="text-2xl font-semibold text-gray-800 mt-5">
                  Welcome back!
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Your tasks are waiting for you.
                </p>

                <Link
                  to="/task/list"
                  className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg duration-300 shadow-md"
                >
                  View My Tasks →
                </Link>
              </div>
            ) : (
              /* New user */
              <div className="bg-blue-100 rounded-xl p-7 shadow-lg shadow-blue-200">
                <p className="text-2xl font-semibold text-gray-800">
                  Start organizing today
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Create your account and keep all your tasks in one simple
                  place.
                </p>

                <Link
                  to="/signup"
                  className="block text-center mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg duration-300 shadow-md"
                >
                  Create Your Account
                </Link>

                <p className="text-center text-sm text-gray-500 mt-5">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-blue-500 ml-1 hover:text-blue-700"
                  >
                    Login
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 text-sm text-gray-400">
        Keep your day organized.
      </footer>
    </div>
  );
}

export default Home;
