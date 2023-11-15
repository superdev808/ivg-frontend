<<<<<<< HEAD
'use client';

import React, { PropsWithChildren, useEffect } from 'react';
=======
import React, { PropsWithChildren } from 'react';
>>>>>>> 23b289bfa06a4f5d4b4db64349e8ac9934ab4e3f
import Navigation from '@/components/navigation';
import './globals.scss';
import { Providers } from '@/redux/provider';

import '../styles/theme/custom/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import AuthProvider from './provider';
<<<<<<< HEAD

import { usePathname } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: PropsWithChildren) {
	const [accessToken, setAccessToken] = React.useState(null);
	const activePath = usePathname();

	useEffect(() => {
		async function getSession() {
			try {
				const response = await fetch('/api/auth/session', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.error);
				}
				setAccessToken(data.session.accessToken || null);
			} catch (error: any) {
				return null;
			}
		}
		getSession();
	}, []);
=======
import createClient from '@/lib/supabase-server';
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: PropsWithChildren) {
	const supabase = createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();
	const accessToken = session?.access_token || null;
>>>>>>> 23b289bfa06a4f5d4b4db64349e8ac9934ab4e3f

	return (
		<html>
			<head></head>
			<body>
				<Providers>
					<AuthProvider accessToken={accessToken}>
<<<<<<< HEAD
						{activePath !== '/login/' ? <Navigation /> : null}

=======
						<Navigation />
>>>>>>> 23b289bfa06a4f5d4b4db64349e8ac9934ab4e3f
						<div
							className="z-1  h-full"
							style={{ paddingTop: '5rem' }}>
							{children}
						</div>
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
