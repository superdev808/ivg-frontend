'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { ReduxProvider } from '@/redux/provider';
import { QueryClient, QueryClientProvider } from 'react-query';


import '../styles/globals.scss';
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { usePathname } from 'next/navigation';
import AuthProvider from './provider';
import Head from 'next/head';

export const dynamic = 'force-dynamic';

const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
	const activePath = usePathname();

	return (
		<html>
			<Head>
				<title>IvoryGuide - {activePath}</title>
			</Head>
			<body>
				<ReduxProvider>
					<AuthProvider>
						<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
					</AuthProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
