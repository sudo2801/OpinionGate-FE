import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "@/services/auth-service/auth-service";
import { toast } from "react-toastify";
import { dispatch } from "@/state/store";
import authThunk from "@/state/ducks/auth/thunks";
import { withLayout } from "@/views/hoc/with-layout";

interface LoginInfoType {
  userName: string;
  password: string;
}

interface LoginScreenPropType {}

export const LoginScreen: FC<LoginScreenPropType> = withLayout(() => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    userName: "",
    password: "",
  });

  const handleOnChange = (e: any) => {
    const { value, name } = e.target || {};
    if (name === "username") {
      setLoginInfo({ ...loginInfo, userName: value });
    } else {
      setLoginInfo({ ...loginInfo, password: value });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    authService.userLogin({ ...loginInfo }).then((res: any) => {
      if (res?.data) {
        const { accessToken, refreshToken, user } = res.data.data || {};
        toast.success("Login Successfully...!");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(authThunk.setLoginThunk(true));
        dispatch(authThunk.setUserThunk(user));
        const userId = user?._id;
        navigate(`/feedback/${userId}`, { state: { isLogin: true } });
      } else {
        if (res.status === 404) {
            toast.error("User Not found..!");
         }
      }
    });
  };

  const handleOnClickRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8 bg-black h-full overflow-hidden">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Login to your Opinion Gate Account
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
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-1"
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
                  required
                  value={loginInfo.password}
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 p-1"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{" "}
            <button
              onClick={handleOnClickRegister}
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Register now!
            </button>
          </p>
        </div>
      </div>
    </>
  );
});
