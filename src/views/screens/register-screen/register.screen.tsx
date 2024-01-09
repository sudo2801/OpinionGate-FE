import authService from "@/services/auth-service/auth-service";
import { withLayout } from "@/views/hoc/with-layout";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginInfoType {
  userName: string;
  password: string;
  fullName: string;
  role: "User" | " Admin";
}
interface LoginScreenPropType {}

export const RegistrationScreen: FC<LoginScreenPropType> = withLayout(() => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    fullName: "",
    password: "",
    userName: "",
    role: "User",
  });

  const handleOnChange = (e: any) => {
    const { value, name } = e.target || {};
    switch (name) {
      case "username":
        setLoginInfo({ ...loginInfo, userName: value });
        break;
      case "fullname":
        setLoginInfo({ ...loginInfo, fullName: value });
        break;
      case "role":
        setLoginInfo({ ...loginInfo, role: value });
        break;
      case "password":
        setLoginInfo({ ...loginInfo, password: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    authService.userRegistration({ ...loginInfo }).then((res: any) => {
      if (res?.data) {
        toast.success("User register Successfully");
        navigate("/");
      } else {
        if (res.status === 409) {
          toast.error("Username is already exist.! Try with another username");
        }
      }
    });
  };

  const handleOnClickLogin = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black h-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register in OpinionGate account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={loginInfo.userName}
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fileName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Full Name
              </label>

              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  value={loginInfo.fullName}
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleOnChange}
                  required
                  value={loginInfo.password}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Select Your Role
                </label>
              </div>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  onChange={handleOnChange}
                  name="role"
                  required
                  value={loginInfo.role}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already Register?{" "}
            <button
              onClick={handleOnClickLogin}
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Login now!
            </button>
          </p>
        </div>
      </div>
    </>
  );
});
