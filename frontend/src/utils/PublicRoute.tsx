import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
