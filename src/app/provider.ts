'use client';
import { useEffect, PropsWithChildren } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCookie } from '@/helpers/cookie';

import { setAuth } from '@/redux/slices/authSlice';
import { verifyAuth } from '@/helpers/verifyAuth';

import Loading from '@/components/layout/loading';

const AuthProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = getCookie('appToken');
				const isAuthenticated = await verifyAuth(token);
				dispatch(setAuth(isAuthenticated));
	
			} catch (error) {
				console.error('Authentication check failed:', error);
				router.push('/');
			}
		};

		checkAuth();
	}, [dispatch, router, pathname]);

	return children;
};

export default AuthProvider;
