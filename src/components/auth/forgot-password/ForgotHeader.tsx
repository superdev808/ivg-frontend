import { Image } from "primereact/image";
import Link from "next/link";

export const ForgotHeader = () => (
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
      Forgot your password?
    </div>

    <span className="font-medium line-height-3">
      Enter your email below and we will send you a reset link.
    </span>
  </div>
);
