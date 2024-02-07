'use client';

import React, { PropsWithChildren, use, useEffect, useState } from 'react';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import Loading from '@/components/layout/loading';
import useAuthRedirect from '@/hooks/useAuthRedirect';

export default function ProtectedLayout({ children }: PropsWithChildren) {
	const {isLoading, layoutStyle} = useAuthRedirect();

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<Navigation secure transparentBg={layoutStyle.transparentBg}/>
			{children}
			<Footer extendFooter={layoutStyle.extendFooter}/>
		</>
	);
}
