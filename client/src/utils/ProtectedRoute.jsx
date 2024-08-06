import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));  
        await axios.get("/api/user/getUserData", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Component {...rest} />;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
