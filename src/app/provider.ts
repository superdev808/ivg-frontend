"use client";

import { useEffect, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hooks";

import { setAuth } from "@/redux/slices/auth/authSlice";
import { usePostVerifyTokenMutation } from "@/redux/hooks/apiHooks";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [postVerifyToken] = usePostVerifyTokenMutation();

  const verifyAuth = async () => {
    try {
      const response = await postVerifyToken({}).unwrap();

      return !Boolean(response?.error);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await verifyAuth();
      dispatch(setAuth(isAuthenticated));
    };

    checkAuth();
  }, [dispatch, pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return children;
};

export default AuthProvider;
