'use client';

import React from 'react';

import { useGetVerifyUserQuery } from '@/redux/hooks/apiHooks';
import { useSearchParams } from 'next/navigation';

import { VerifySuccess } from './VerifySuccess';
import { VerifyInvalid } from './VerifyInvalid';

export const VerifyComponent = () => {
	const searchParams = useSearchParams();

	const { isLoading, isSuccess, isError } = useGetVerifyUserQuery(searchParams.get('token') || '', {});

	const currentDisplay = () => {
		if (isSuccess) return <VerifySuccess />;
		if (isError)
			return (
				<>
					<VerifyInvalid />
				</>
			);
		return <></>;
	};

	if (isLoading) return <></>;

	return (
		<>
			<div className="background-gradient"></div>
			<div className="container ">
				<div className="wrapper h-full flex flex-column align-items-center justify-content-center">{currentDisplay()}</div>
			</div>
		</>
	);
};
