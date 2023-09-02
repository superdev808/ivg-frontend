'use client';
import React, { PropsWithChildren } from 'react';
import Navigation from '@/components/navigation';
import './globals.scss';
import { Providers } from '@/redux/provider';

import '../styles/theme/custom/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

export default function RootLayout({ children }: PropsWithChildren) {

	return (
		<html>
			<head></head>
			<body>
				<Providers>
					<Navigation />
					<div className='container'>

					{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
