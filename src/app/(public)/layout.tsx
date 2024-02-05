'use client';

import React, { PropsWithChildren, useEffect, useState, } from 'react';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import Loading from '@/components/layout/loading';

import useAuthRedirect from '@/hooks/useAuthRedirect';

export default function PublicLayout({ children }: PropsWithChildren) {
	const {isLoading, layoutStyle} = useAuthRedirect();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			{layoutStyle.hidden ? null : <Navigation transparentBg={layoutStyle.transparentBg} />}
			{children}
			{layoutStyle.hidden ? null : <Footer extendFooter={layoutStyle.extendFooter} />}
		
		</>
	);
}
