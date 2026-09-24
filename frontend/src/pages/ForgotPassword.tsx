import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetAuthSlice, forgotPassword } from "../store/slices/authSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const { loading, message, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  const handleForgotPasswordChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="bg-blue-50 min-h-screen w-screen flex">
      <div className="bg-blue-100 w-96 h-56 my-auto mx-auto rounded-lg shadow-lg shadow-blue-300 ">
        <div className="h-full flex-col p-5">
          <form onSubmit={handleSubmit}>
            <p className="block mt-1 mb-4  text-lg text-center">
              Retrieve Your Account
            </p>
            <label className="block ">
              Email
              <input
                className="block h-7 p-2 my-3 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                type="email"
                name="email"
                value={email}
                onChange={handleForgotPasswordChanges}
              />
            </label>
            <div className="w-full flex  justify-center align-middle mb-0">
              <input
                className="w-30  mt-4 h-8 bg-blue-500 rounded-lg text-gray-100 text-sm"
                type="submit"
                value="Send OTP"
                disabled={loading ? true : false}
              />
            </div>
            <div className="flex text-sm justify-center">
              <a className="text-blue-500  ml-1 mt-0 " href="/signup">
                <u>Create a new account.</u>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
