import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks/hooks';
import { BYPASS_AUTH_ROUTES, PRIVATE_ROUTES, PUBLIC_AUTH_ROUTES, PUBLIC_ROUTES, REDIRECT_TO_AUTH, REDIRECT_TO_UNAUTH } from '@/constants/routes';
import { useRouter, usePathname } from 'next/navigation';

interface LayoutStyle {
	hidden?: boolean;
	transparentBg?: boolean;
	extendFooter?: boolean;
}

const layoutStyles = {
	default: {
		transparentBg: false,
		extendFooter: false,
	},
	simple: {
		transparentBg: true,
		extendFooter: true,
	},
	hidden: {
		hidden: true,
	},
};

const useAuthRedirect = () => {
	const activePath = usePathname();
	const router = useRouter();
	const { isLoading: authLoading, authenticated } = useAppSelector((state) => state.auth);
	const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>(layoutStyles.default);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const checkAuthStatus = () => {
			if (authLoading) return;

			if (!authenticated && Object.values(PRIVATE_ROUTES).includes(activePath as PRIVATE_ROUTES)) {
				return router.replace(REDIRECT_TO_UNAUTH);
			} else if (
				authenticated &&
				!BYPASS_AUTH_ROUTES.includes(activePath as PUBLIC_AUTH_ROUTES) &&
				!Object.values(PRIVATE_ROUTES).includes(activePath as PRIVATE_ROUTES)
			) {
				return router.replace(REDIRECT_TO_AUTH);
			}
			setIsLoading(false);
		};

		if (Object.values(PUBLIC_AUTH_ROUTES).includes(activePath as PUBLIC_AUTH_ROUTES)) {
			setLayoutStyle(layoutStyles.hidden);
		} else if (Object.values(PUBLIC_ROUTES).includes(activePath as PUBLIC_ROUTES)) {
			setLayoutStyle(layoutStyles.simple);
		} else if (activePath === PRIVATE_ROUTES.HOME) {
			setLayoutStyle(layoutStyles.simple);
		} else {
			setLayoutStyle(layoutStyles.default);
		}

		checkAuthStatus();
	}, [activePath, authenticated, router, authLoading]);
	return { layoutStyle, isLoading };
};

export default useAuthRedirect;
