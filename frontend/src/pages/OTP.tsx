import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { OTPVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function OTP() {
  const dispatch = useAppDispatch();
  const { loading, message, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const { email } = useParams();
  const navigateTo = useNavigate();

  const [OTP, setOTP] = useState("");

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigateTo("/login");
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, navigateTo]);

  function handleOTPChanges(e: React.ChangeEvent<HTMLInputElement>) {
    setOTP(e.target.value.replace(/\D/g, "").slice(0, 6));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (/^\d{6}$/.test(OTP) && email) {
      dispatch(OTPVerification(email, OTP));
    }
  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="min-h-screen   bg-blue-50 flex">
      <div className="min-h-64 w-72  mx-auto my-auto bg-blue-100 p-4 rounded-lg">
        <p className="text-lg text-center">Got a OTP ?</p>
        <form onSubmit={handleSubmit}>
          <div className="flex-col  justify-center ">
            <label className="block">
              Email:
              <input
                className="block h-7 p-2 my-3  w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                placeholder="Email"
                type="email"
                value={email}
                name="email"
                disabled
              />
            </label>
            <label className="block">
              OTP:
              <input
                className="block h-7 p-2 my-3  w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                placeholder="OTP"
                value={OTP}
                onChange={handleOTPChanges}
                type="number"
                name="newUserFullName"
              />
            </label>
          </div>

          <div className="w-full flex  text-sm justify-center">
            <input
              type="submit"
              value="Send OTP"
              disabled={loading ? true : false}
              className="bg-blue-500 text-gray-50 w-35 mt-2  rounded-md h-7"
            />
          </div>
          <div className="w-full flex justify-center">
            <a className="text-center  text-sm text-blue-400 " href="/signup">
              create a new account.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
