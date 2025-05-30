import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const LoginWrapper = () => {
  const navigate = useNavigate();

  return (
    <Login
      onLoginSuccess={(userData) => {
        navigate("/home"); 
      }}
    />
  );
};

export default LoginWrapper;
