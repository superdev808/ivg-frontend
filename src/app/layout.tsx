'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import Navigation from '@/components/navigation';
import { Providers } from '@/redux/provider';
import { QueryClient, QueryClientProvider } from "react-query";

import '../styles/globals.scss';
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import AuthProvider from './provider';

import { usePathname } from 'next/navigation';
import Footer from '@/components/footer';
export const dynamic = 'force-dynamic';

const queryClient = new QueryClient();

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

	return (
		<html>
			<head></head>
			<body>
				<Providers>
					<AuthProvider accessToken={accessToken}>
						<QueryClientProvider client={queryClient}>
							{activePath !== '/login/' ? <Navigation /> : null}
							<div
								className={'z-1 w-full flex-grow-1 '}
								style={{ paddingTop: '5rem'}}>
								{children}
							</div>
							<Footer />
						</QueryClientProvider>
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
