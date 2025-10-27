import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // if no token found → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // otherwise render the child component
  return children;
};

export default ProtectedRoute;
