"use client";

import React, { useEffect, useState } from "react";

import ResetForm from "./ResetForm";
import { ResetHeader } from "./ResetHeader";
import { usePostValidateTokenMutation } from "@/redux/hooks/apiHooks";
import { useSearchParams } from "next/navigation";

import { ResetInvalid } from "./ResetInvalid";
import { ResetSuccess } from "./ResetSuccess";

export const ResetComponent = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [postValidateToken] = usePostValidateTokenMutation();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token") || "";

    postValidateToken({ token: token })
      .unwrap()
      .then((res) => {
        if (res.valid) {
          setToken(token);
        } else {
          setToken("");
        }
      })
      .catch(() => {
        setToken("");
      });
  }, [searchParams, postValidateToken]);

  const currentDisplay = () => {
    if (success) return <ResetSuccess />;

    if (token === "") return <ResetInvalid />;

    return (
      <>
        <ResetHeader />
        <ResetForm token={token} setSuccess={setSuccess} />
      </>
    );
  };

  if (token === null) return null;

  return (
    <div className="flex flex-1 bg-beige pb-8 px-4">
      <div className="wrapper flex flex-1 flex-column align-items-center justify-content-center">
        {currentDisplay()}
      </div>
    </div>
  );
};
