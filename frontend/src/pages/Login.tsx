import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toast } from "react-toastify";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

interface logInInfo {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, message, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const navigateTo = useNavigate();

  const [userInfo, setUserInfo] = useState<Partial<logInInfo>>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigateTo("/");
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, loading, error, message,isAuthenticated]);

  function handleLoginFormChanges(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(userInfo));
  };

  
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className=" min-h-screen min-w-screen bg-blue-50 flex ">
      <div className="w-96 h-96 bg-blue-100 mx-auto my-auto rounded-lg shadow-xl shadow-blue-200 p-5">
        <p className="block mt-2 mb-10  text-xl text-center">
          Log Into Your Account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex-col justify-center">
            <label className="block ">
              Email
              <input
                onChange={handleLoginFormChanges}
                className="block h-7 p-2 my-4 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                type="email"
                name="email"
                value={userInfo.email}
              />
            </label>
            <label className="block ">
              Password
              <input
                onChange={handleLoginFormChanges}
                className="block h-7 p-2 my-4 text-md w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                type="password"
                name="password"
                value={userInfo.password}
              />
            </label>
          </div>
          <div className="w-full flex justify-center">
            <a
              className="text-center  text-sm text-blue-400 "
              href="/password/forgot"
            >
              forgot password ?
            </a>
          </div>
          <div className="w-full flex justify-center">
            <input
              type="submit"
              value="Login"
              disabled={loading ? true : false}
              className="bg-blue-500 text-gray-50 w-35 mt-8  rounded-md h-7"
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
