"use client";

import React from "react";

import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const LoginComponent: React.FC = () => (
  <div className="flex flex-1 pb-8 px-4">
    <div className="wrapper flex flex-1 flex-column align-items-center justify-content-center">
      <LoginHeader />
      <LoginForm />
    </div>
  </div>
);

export default LoginComponent;
