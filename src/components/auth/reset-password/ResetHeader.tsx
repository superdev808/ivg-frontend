import Link from "next/link";
import { Image } from "primereact/image";

export const ResetHeader = () => (
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
      Reset new password
    </div>
    <span className="font-medium line-height-3">
      Password must be at least 8 characters and include an uppercase letter, a
      lowercase letter, a number, and a symbol.
    </span>
  </div>
);
