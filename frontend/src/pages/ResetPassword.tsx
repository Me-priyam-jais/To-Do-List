import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";
import { toast } from "react-toastify";

interface newPasswords {
  newPassword: string;
  confirmNewPassword: string;
}
export default function ResetPassword() {
  const dispatch = useAppDispatch();

  const { loading, error, message, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const navigateTo = useNavigate();

  const { resetPasswordToken } = useParams();

  const [passwords, setPasswords] = useState<Partial<newPasswords>>({
    newPassword: "",
    confirmNewPassword: "",
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
  }, [dispatch, error, message, navigateTo]);

  const handleResetPasswordChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resetPasswordToken) {
      dispatch(resetPassword(passwords, resetPasswordToken));
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="min-h-screen   bg-blue-50 flex">
      <div className="min-h-84 w-84  mx-auto my-auto bg-blue-100 p-4 rounded-lg">
        <p className="text-lg text-center">Reset Your Pasword</p>
        <form onSubmit={handleSubmit}>
          <div className="flex-col  justify-center mt-6">
            <label className="block">
              new password :
              <input
                onChange={handleResetPasswordChanges}
                className="block h-7 p-2 my-3  w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                placeholder="new password"
                type="password"
                name="newPassword"
                value={passwords.newPassword}
              />
            </label>
            <label className="block">
              confirm new password :
              <input
                onChange={handleResetPasswordChanges}
                className="block h-7 p-2 my-3  w-full outline-1 outline-blue-300 rounded-md bg-blue-50 focus:outline-2 focus:outline-blue-400 hover:outline-blue-400 hover:outline-2 "
                placeholder="confirm new password"
                type="password"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
              />
            </label>
          </div>

          <div className="w-full flex  text-sm justify-center">
            <input
              onChange={handleResetPasswordChanges}
              type="submit"
              value="Reset password"
              disabled={loading ? true : false}
              className="bg-blue-500 text-gray-50 w-35 mt-6 mb-1  rounded-md h-7"
            />
          </div>
          <div className="w-full flex justify-center">
            <a className="text-center  text-sm text-blue-400 " href="/login">
              <u>back to login ?</u>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
