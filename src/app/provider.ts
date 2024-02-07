'use client';
import { useEffect, PropsWithChildren } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks/hooks';

import { setAuth } from '@/redux/slices/auth/authSlice';
import { PRIVATE_ROUTES } from '@/constants/routes';
import { usePostVerifyTokenMutation } from '@/redux/hooks/apiHooks';

const AuthProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const [postVerifyToken] = usePostVerifyTokenMutation();
	const verifyAuth = async () => {
		try {
			const response: any = await postVerifyToken({}).unwrap();

			if (response.error) {
				return false;
			}
			return true;
		} catch (error) {
			return false;
		}
	};
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const isAuthenticated = await verifyAuth();
				dispatch(setAuth(isAuthenticated));
			} catch (error) {
				console.error('Authentication check failed:', error);
				router.push('/');
			}
		};

		checkAuth();
	}, [dispatch, router, pathname]); // eslint-disable-line react-hooks/exhaustive-deps

	return children;
};

export default AuthProvider;
