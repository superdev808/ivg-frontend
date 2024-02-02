'use client';

import React, { PropsWithChildren, use, useEffect } from 'react';
import Navigation from '@/components/layout/navigation';
import { ReduxProvider } from '@/redux/provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppSelector } from '@/redux/hooks/hooks';

import { usePathname, useRouter } from 'next/navigation';
import Footer from '@/components/layout/footer';
import Loading from '@/components/layout/loading';
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";


export default function PublicLayout({ children }: PropsWithChildren) {
	const activePath = usePathname();
	const [isLoading, setIsLoading] = React.useState(true);
	const [simpleLayout, setSimpleLayout] = React.useState(false);
	const [hideLayout, setHideLayout] = React.useState(false);

	const {isLoading:authLoading, authenticated} = useAppSelector((state) => state.auth);
	const bypassAuth = ['/reset-password/'];
	useEffect(() => {
		
		
		if (authLoading) return



		if (authenticated && !bypassAuth.includes(activePath)) {
			return redirect("/calculators");

		}
		if (['/login/', '/register/','/verify/','/reset-password/','/forgot-password/'].includes(activePath)) {
			setSimpleLayout(true);
		}else {
			setSimpleLayout(false);
		}

		
		setIsLoading(false);
	}, [activePath, authLoading]);


	if (isLoading || authLoading) {
		return <Loading />;
	}

	return (
		<>
			{simpleLayout ? null : <Navigation transparentBg />}
			{children}
			{simpleLayout ? null : <Footer extendFooter={simpleLayout} />}
		
		</>
	);
}
