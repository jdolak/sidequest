import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  //if (isAuthenticated) {
  //  alert("You are already logged in!");
  //  return <Navigate to="/search" replace />;
  //}

  return <Outlet />;
};

export default PublicRoute;