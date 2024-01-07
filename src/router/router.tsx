import { createBrowserRouter } from "react-router-dom";

import { LoginScreen } from "@/views/screens/login-screen";
import { RegistrationScreen } from "@/views/screens/register-screen";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegistrationScreen />,
    children: [],
  },
]);
