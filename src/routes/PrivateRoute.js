import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate } from "../service/authenticate/authenticate-api";

const PrivateRoute = (props) => {
  if (isAuthenticate()) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default PrivateRoute;
