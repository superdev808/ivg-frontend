'use client';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCookie } from '@/helpers/cookie';

import { setAuth } from '@/redux/slices/authSlice';
import { verifyAuth } from '@/helpers/verifyAuth';

const AuthProvider = ({ children }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

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
	}, [dispatch, router]);

	return children;
};

export default AuthProvider;
