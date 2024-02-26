import { Button } from "primereact/button";
import Link from "next/link";

const RegisterComplete: React.FC = () => (
  <div className="flex flex-column justify-content-center align-items-center h-full text-center">
    <span className="text-6xl mb-6">Thank you for registering!</span>

    <i className="pi pi-check-circle text-8xl" />

    <div className="text-2xl my-6">
      Your account has been created and a verification email has been sent to
      your registered email address. Please click verification link included in
      the email to activate your account.
    </div>

    <Link href="/login">
      <Button
        label="Return to login"
        className=" p-button-rounded bg-secondary "
      />
    </Link>
  </div>
);

export default RegisterComplete;
