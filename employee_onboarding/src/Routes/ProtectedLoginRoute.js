import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const userdata = JSON.parse(localStorage.getItem("User_Detial"));
  const UserRole = userdata?.role;
  const location = useLocation();

  if (!UserRole) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (UserRole === 1) {
    if (location.pathname.startsWith("/admindashboard")) {
      return <Navigate to="/userdashboard" />;
    }
  } else if (UserRole === 2) {
    if (location.pathname.startsWith("/user")) {
      return <Navigate to="/admindashboard" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
