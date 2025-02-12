import Link from "next/link";
import { Button } from "primereact/button";
import React from "react";

const RegisterError: React.FC = () => (
  <div className="grid flex-column justify-content-center h-full align-content-center">
    <span className="text-5xl mb-6 text-center">
      We are currently experiencing issues with our service
    </span>

    <span className="text-center">
      <i className="pi pi-times-circle text-8xl text-dark-brown" />
    </span>

    <div className="text-xl text-center my-6 text-center">
      <span>
        Please refresh your page or try again later. Feel free to contact us at{" "}
        <a href="mailto:support@ivoryguide.com">support@ivoryguide.com</a> if
        the problem persists.
      </span>
    </div>

    <div className="text-center">
      <Link href="/login">
        <Button
          label="Return to login"
          className="p-button-rounded bg-secondary"
        />
      </Link>
    </div>
  </div>
);

export default RegisterError;
