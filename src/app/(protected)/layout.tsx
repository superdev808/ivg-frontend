'use client';

import React, { PropsWithChildren, use, useEffect } from 'react';
import Navigation from '@/components/layout/navigation';
import { ReduxProvider } from '@/redux/provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppSelector } from '@/redux/hooks/hooks';

import { redirect, usePathname } from 'next/navigation';
import Footer from '@/components/layout/footer';
import Loading from '@/components/layout/loading';
import { set } from 'lodash';
export const dynamic = 'force-dynamic';

export default function PublicLayout({ children }: PropsWithChildren) {
	const activePath = usePathname();
	const [isLoading, setIsLoading] = React.useState(true);
	const {isLoading:authLoading, authenticated} = useAppSelector((state) => state.auth);
	const [transparentBg, setTransparentBg] = React.useState(false);
	useEffect(() => {
		if (authLoading) return;
		if(!authenticated) {
			return redirect("/login");
		}
		if (activePath === '/home/'){
			setTransparentBg(true);
		} else {
			setTransparentBg(false);
		}
		setIsLoading(false);
	}, [activePath,authLoading]);



	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<Navigation secure  transparentBg={transparentBg}/>
			{children}
			<Footer extendFooter={true} />
		</>
	);
}
