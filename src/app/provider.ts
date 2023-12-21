'use client';

import { createContext, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCookie } from '@/helpers/cookie';

// export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { authenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		const appToken = getCookie('appToken');
		if (!authenticated) {
			if (appToken) {
				dispatch({ type: 'auth/setAuth', payload: { authenticated: true } });
			} else {
				router.push("/");
			}
		}
	}, [authenticated]);

	return children;
};

export default AuthProvider;
