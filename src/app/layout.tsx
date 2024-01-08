'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import Navigation from '@/components/layout/navigation';
import { Providers } from '@/redux/provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppSelector } from '@/redux/hooks';

import '../styles/globals.scss';
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/footer';
import { useDispatch } from 'react-redux';
import { getCookie } from '@/helpers/cookie';
import AuthProvider from './provider';
export const dynamic = 'force-dynamic';

const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
	const activePath = usePathname();

	return (
		<html>
			<head></head>
			<body>
				<Providers>
					<AuthProvider>
						<QueryClientProvider client={queryClient}>
							{['/login/', '/signup/'].includes(activePath) ? null : <Navigation />}
							{children}
							<Footer />
						</QueryClientProvider>
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
