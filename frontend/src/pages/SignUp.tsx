import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetAuthSlice, signUp } from "../store/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface newUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { loading, message, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const navigateTo = useNavigate();

  const [newUserData, setNewUserData] = useState<Partial<newUser>>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigateTo(`/verify-otp/${encodeURIComponent(newUserData.email ?? "")}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp(newUserData));
  };

  const handleFormChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({ ...prev, [name]: value }));
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="bg-blue-50   min-h-screen flex ">
      <div
        className="min-h-10/12 my-auto  bg-blue-100  min-w-40 w-96 mx-auto 
      rounded-lg p-5 shadow-blue-200 flex-col "
      >
        <p className=" block mt-2 mb-10  text-xl ">
          Register Yourself on our platfrom
        </p>
        <form onSubmit={handleSubmit}>
          <div className="h-full flex-col">
            <label className="block ">
              Enter your Full Name:
              <input
                className="block h-7 p-2 my-4 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                type="text"
                name="name"
                value={newUserData.name}
                onChange={handleFormChanges}
              />
            </label>
            <label className="block ">
              Enter your email:
              <input
                className="block h-7 p-2 my-4 w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleFormChanges}
              />
            </label>
            <label className="block ">
              Create a new password:
              <input
                className="block h-7 p-2 my-4 w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                type="password"
                name="password"
                value={newUserData.password}
                onChange={handleFormChanges}
              />
            </label>
            <label className="block ">
              Confirm Password:
              <input
                className="block h-7 p-2 my-4 w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                type="password"
                name="confirmPassword"
                value={newUserData.confirmPassword}
                onChange={handleFormChanges}
              />
            </label>
            <div className="w-full flex justify-left mt-8">
              <label className="text-sm ">
                <input type="checkbox" className="w-5" />I read and agree to{" "}
                <span className="text-blue-500">
                  <u>all Terms and Conditions</u>.
                </span>
              </label>
            </div>
          </div>
          <div className="w-full flex  justify-center align-middle mb-0">
            <input
              className="w-30  mt-8 h-8 bg-blue-500 rounded-lg text-gray-100 duration-300 ease-in-out  "
              type="submit"
              value="submit"
              disabled={loading ? true : false}
            />
          </div>
          <div className="flex text-sm justify-center">
            <p className="">have a account ?</p>
            <a className="text-blue-500  ml-1 mt-0 " href="/login">
              <u>Login</u>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
