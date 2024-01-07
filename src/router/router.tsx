import { createBrowserRouter } from "react-router-dom";
import {  LoginScreen } from "../views/screens/login-screen/login.screen";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
    children: [],
  },
]);
