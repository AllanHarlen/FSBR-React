import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/useAuth";

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
