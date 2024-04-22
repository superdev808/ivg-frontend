"use client";

import React, { PropsWithChildren } from "react";

import Footer from "@/components/layout/footer";
import Loading from "@/components/layout/loading";
import Navigation from "@/components/layout/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function PublicLayout({ children }: PropsWithChildren) {
  const { isLoading, layoutStyle } = useAuthRedirect();

  const { authenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!layoutStyle.hidden && (
        <Navigation
          authenticated={authenticated}
          light={layoutStyle.navLight}
        />
      )}
      {children}
      {!layoutStyle.hidden && (
        <Footer extendFooter={layoutStyle.extendFooter} />
      )}
    </>
  );
}
