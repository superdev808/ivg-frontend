
import React, { PropsWithChildren } from 'react';
import Navigation from '@/components/navigation';
import './globals.scss';
import { Providers } from '@/redux/provider';

import '../styles/theme/custom/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import AuthProvider from './provider';
import createClient from '@/lib/supabase-server';
export default async function RootLayout({ children }: PropsWithChildren) {
	const supabase = createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const accessToken = session?.access_token || null;
	return (
		<html>
			<head></head>
			<body>
				<AuthProvider accessToken={accessToken}>
					<Providers>
						<Navigation />
						<div
							className="container z-1"
							style={{ overflowX: 'hidden' }}>
							{children}
						</div>
					</Providers>
				</AuthProvider>
			</body>
		</html>
	);
}
