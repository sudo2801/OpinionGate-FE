import { createBrowserRouter } from "react-router-dom";

import { LoginScreen } from "@/views/screens/login-screen";
import { RegistrationScreen } from "@/views/screens/register-screen";
import { FeedbackScreen } from "@/views/screens/feedback-screen/feedback.screen";
import ProtectedRoutes from "@/hook/private-route/private.route";

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
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/feedback/:userID",
        element: <FeedbackScreen />,
      },
    ],
  },
]);
