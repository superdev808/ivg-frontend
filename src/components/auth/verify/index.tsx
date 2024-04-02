"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { useGetVerifyUserQuery } from "@/redux/hooks/apiHooks";

import { VerifySuccess } from "./VerifySuccess";
import { VerifyInvalid } from "./VerifyInvalid";

export const VerifyComponent = () => {
  const searchParams = useSearchParams();

  const { isLoading, isSuccess, isError } = useGetVerifyUserQuery(
    searchParams.get("token") || "",
    {}
  );

  const currentDisplay = () => {
    if (isSuccess) return <VerifySuccess />;
    if (isError) return <VerifyInvalid />;
    return null;
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-1 bg-beige pb-8 px-4">
      <div className="wrapper flex flex-1 flex-column align-items-center justify-content-center">
        {currentDisplay()}
      </div>
    </div>
  );
};
