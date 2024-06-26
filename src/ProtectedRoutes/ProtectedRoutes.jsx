import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReverseProtectedRoutes({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
}