import Link from "next/link";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

interface ForgotCompleteProps {
  requestedEmail: string | null;
}

export const ForgotComplete: React.FC<ForgotCompleteProps> = ({
  requestedEmail,
}) => (
  <>
    <div className="flex flex-column w-full md:w-5 text-center">
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
      <div className="text-dark-green text-6xl font-medium mb-3">
        Check your email
      </div>
      <span className="font-medium text-xl my-4">
        We sent password reset instructions to:
      </span>

      <span className="font-medium text-2xl my-4">{requestedEmail}</span>

      <span className="font-medium text-xl my-4">
        If it doesn&apos;t arrive soon, check your spam folder. Please{" "}
        <Link href="/contact" className="text-dark-green">
          contact us
        </Link>{" "}
        if you need additional assistance.
      </span>

      <div className="flex justify-content-center mt-3">
        <Link href={`/login`}>
          <Button
            label="Return to login"
            className="p-button-rounded bg-secondary"
          />
        </Link>
      </div>
    </div>
  </>
);
