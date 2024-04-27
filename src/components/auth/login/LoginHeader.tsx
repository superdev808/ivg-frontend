import Link from "next/link";
import { Image } from "primereact/image";
import React from "react";

const LoginHeader: React.FC = () => (
  <div className="text-center">
    <Link
      href="/"
      style={{
        display: "block",
        textDecoration: "none",
        alignSelf: "center",
      }}
    >
      <Image
        src="/images/logo/Ivory-Guide-Logo-Horizontal-Dark.svg"
        alt="Logo"
        width="150"
        height="30"
        className="relative mb-3"
      />
    </Link>

    <div className="text-dark-green text-3xl font-medium mb-3">
      Welcome Back
    </div>

    <span className="font-medium line-height-3">
      Don&apos;t have an account?
    </span>

    <Link
      href="/register"
      className="font-medium no-underline ml-2 text-dark-green cursor-pointer"
    >
      Get Started!
    </Link>
  </div>
);

export default LoginHeader;
