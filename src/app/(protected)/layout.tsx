"use client";

import React, { PropsWithChildren } from "react";

import Footer from "@/components/layout/footer";
import Loading from "@/components/layout/loading";
import Navigation from "@/components/layout/navigation";
import { ForbiddenContent } from "@/components/public/error/ForbiddenContent";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { ConfirmPopup } from "primereact/confirmpopup";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { isLoading, layoutStyle } = useAuthRedirect();
  const { isCalcInfoLoading, isCalcInfoError } = useCalculatorsInfo();

  if (isLoading || isCalcInfoLoading) {
    return <Loading />;
  }

  if (isCalcInfoError) return <ForbiddenContent />;

  return (
    <>
      <ConfirmPopup />
      <Navigation authenticated light={layoutStyle.light} />
      {children}
      <Footer
        extendFooter={layoutStyle.extendFooter}
        light={layoutStyle.light}
      />
    </>
  );
}
