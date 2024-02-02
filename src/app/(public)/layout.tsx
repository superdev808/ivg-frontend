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
import { BYPASS_ROUTES, PUBLIC_ROUTES } from '@/contants/routes';


export default function PublicLayout({ children }: PropsWithChildren) {
	const activePath = usePathname();
	const [isLoading, setIsLoading] = React.useState(true);
	const [simpleLayout, setSimpleLayout] = React.useState(false);

	const {isLoading:authLoading, authenticated} = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (authLoading) return

		if (authenticated && !BYPASS_ROUTES.includes(activePath)) {
			return redirect("/calculators");

		}
		if (PUBLIC_ROUTES.includes(activePath)) {
			setSimpleLayout(true);
		}else {
			setSimpleLayout(false);
		}

		setIsLoading(false);
	}, [activePath, authLoading]); // eslint-disable-line react-hooks/exhaustive-deps


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
