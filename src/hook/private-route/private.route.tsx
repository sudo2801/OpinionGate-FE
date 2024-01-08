import authDuck from "@/state/ducks/auth";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isUserLogin = authDuck.IsLoggedIn();

  if (isUserLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutes;
