import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ADMIN_ROUTES,
  BYPASS_AUTH_ROUTES,
  PRIVATE_ROUTES,
  PUBLIC_AUTH_ROUTES,
  PUBLIC_ROUTES,
  REDIRECT_TO_AUTH,
  REDIRECT_TO_UNAUTH,
} from "@/constants/routes";
import { USER_ROLES } from "@/constants/users";
import { getUserRole } from "@/helpers/getUserRole";
import { useAppSelector } from "@/redux/hooks/hooks";

interface LayoutStyle {
  hidden?: boolean;
  navLight?: boolean;
  extendFooter?: boolean;
}

const useAuthRedirect = () => {
  const activePath = usePathname();
  const router = useRouter();

  const { isLoading: authLoading, authenticated } = useAppSelector(
    (state) => state.auth
  );

  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>({
    navLight: true,
    extendFooter: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      if (authLoading) return;

      if (Object.values(PUBLIC_ROUTES).includes(activePath as PUBLIC_ROUTES)) {
        setIsLoading(false);
        return;
      }

      if (
        !authenticated &&
        Object.values(PRIVATE_ROUTES).some((route) =>
          activePath.startsWith(route)
        )
      ) {
        return router.replace(REDIRECT_TO_UNAUTH);
      }

      if (
        authenticated &&
        !BYPASS_AUTH_ROUTES.includes(activePath as PUBLIC_AUTH_ROUTES) &&
        !Object.values(PRIVATE_ROUTES).filter((route) =>
          activePath.includes(route)
        ).length
      ) {
        return router.replace(REDIRECT_TO_AUTH);
      }

      const userRole = getUserRole();

      if (authenticated) {
        if (
          ADMIN_ROUTES.includes(activePath as PRIVATE_ROUTES) &&
          userRole !== USER_ROLES.ADMIN
        ) {
          return router.replace(PUBLIC_ROUTES.FORBIDDEN);
        }
      }

      setIsLoading(false);
    };

    if (
      Object.values(PUBLIC_AUTH_ROUTES).includes(
        activePath as PUBLIC_AUTH_ROUTES
      )
    ) {
      setLayoutStyle({ hidden: true });
    } else if (
      activePath === PUBLIC_ROUTES.INDEX ||
      activePath === PUBLIC_ROUTES.HOME ||
      activePath === PUBLIC_ROUTES.ABOUT
    ) {
      setLayoutStyle({ navLight: true, extendFooter: true });
    }

    checkAuthStatus();
  }, [activePath, authenticated, router, authLoading]);

  return { layoutStyle, isLoading };
};

export default useAuthRedirect;
