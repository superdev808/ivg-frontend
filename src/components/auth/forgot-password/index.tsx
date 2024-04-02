"use client";

import React, { useState } from "react";

import { ForgotComplete } from "./ForgotComplete";
import ForgotForm from "./ForgotForm";
import { ForgotHeader } from "./ForgotHeader";

export const ForgotComponent: React.FC = () => {
  const [requestedEmail, setRequestedEmail] = useState<string | null>(null);

  return (
    <div className="flex flex-1 bg-beige pb-8 px-4">
      <div className="wrapper flex flex-1 flex-column align-items-center justify-content-center">
        {!requestedEmail ? (
          <>
            <ForgotHeader />
            <ForgotForm setRequestedEmail={setRequestedEmail} />
          </>
        ) : (
          <ForgotComplete requestedEmail={requestedEmail} />
        )}
      </div>
    </div>
  );
};
