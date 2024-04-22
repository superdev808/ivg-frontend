"use client";

import React, { PropsWithChildren } from "react";

import Footer from "@/components/layout/footer";
import Loading from "@/components/layout/loading";
import Navigation from "@/components/layout/navigation";
import { ForbiddenContent } from "@/components/public/error/ForbiddenContent";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useCalculatorsInfo from "@/hooks/useCalculatorsInfo";
import { ConfirmPopup } from "primereact/confirmpopup";
import { usePathname } from "next/navigation";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { isLoading, layoutStyle } = useAuthRedirect();
  const { isCalcInfoLoading, isCalcInfoError } = useCalculatorsInfo();
  const pathname = usePathname();

  if (isLoading || isCalcInfoLoading) {
    return <Loading />;
  }

  if (isCalcInfoError) return <ForbiddenContent />;

  return (
    <>
      <ConfirmPopup />
      <Navigation authenticated light={layoutStyle.light} />
      {children}
      <Footer extendFooter={layoutStyle.extendFooter && /^\/calculators(\/?)$/ig.test(pathname)} />
    </>
  );
}
