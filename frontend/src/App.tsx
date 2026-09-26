import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import List from "./pages/List";
import "./App.css";
import UpdatePassword from "./pages/UpdatePassword";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./store/slices/authSlice";
import ThemeToggle from "./components/ThemeToggle";


export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp/:email" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route
          path="/password/reset/:resetPasswordToken"
          element={<ResetPassword />}
        />
        <Route path="/password/update/:email" element={<UpdatePassword />} />
        <Route path="/task/list" element={<List />} />
      </Routes>
      <ThemeToggle />
      <ToastContainer />
    </Router>
  );
}
