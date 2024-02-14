"use client";

import React, { PropsWithChildren } from "react";

import Footer from "@/components/layout/footer";
import Loading from "@/components/layout/loading";
import Navigation from "@/components/layout/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function PublicLayout({ children }: PropsWithChildren) {
  const { isLoading, layoutStyle } = useAuthRedirect();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!layoutStyle.hidden && (
        <Navigation transparentBg={layoutStyle.transparentBg} />
      )}
      {children}
      {!layoutStyle.hidden && (
        <Footer extendFooter={layoutStyle.extendFooter} />
      )}
    </>
  );
}
