'use client';

import { createContext, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';

// export const AuthContext = createContext();

const AuthProvider = ({ accessToken, children }) => {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const {
			data: { subscription: authListener },
		} = supabase.auth.onAuthStateChange((event, session) => {
			dispatch({ type: 'auth/setAuth', payload: session });
			if (session?.access_token !== accessToken) {
				router.refresh();
				// router.push('/login');
			}
		});

		return () => {
			authListener?.unsubscribe();
		};
	}, [accessToken, supabase, router]);



	return children;
};

export default AuthProvider;
