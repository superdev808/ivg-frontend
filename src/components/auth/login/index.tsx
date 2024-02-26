"use client";

import React from "react";

import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const LoginComponent: React.FC = () => (
  <>
    <div className="background-gradient" />
    <div className="container">
      <div className="wrapper h-full flex flex-column align-items-center justify-content-center">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  </>
);

export default LoginComponent;
