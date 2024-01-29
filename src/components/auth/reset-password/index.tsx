'use client';

import React, { useEffect, useState } from 'react';

import ResetForm from './ResetForm';
import { ResetHeader } from './ResetHeader';
import { usePostValidateTokenMutation } from '@/redux/hooks/apiHooks';
import { useSearchParams } from 'next/navigation';

import { ResetInvalid } from './ResetInvalid';
import { set } from 'lodash';
import { ResetSuccess } from './ResetSuccess';

export const ResetComponent = () => {
	const searchParams = useSearchParams();
	const [token, setToken] = useState<string | null>(null);
	const [postValidateToken, result] = usePostValidateTokenMutation();
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const token = searchParams.get('token') || '';

		postValidateToken({ token: token })
			.unwrap()
			.then((res) => {
				if (res.valid) {
					setToken(token);
				} else {
					setToken('');
				}
			})
			.catch((err) => {
				setToken('');
			});
	}, []);

	const currentDisplay = () => {
		
		if (success) return <ResetSuccess />;
		if (token === '') return <><ResetInvalid /></>
		return (
			<>
				<ResetHeader />
				<ResetForm token={token} setSuccess={setSuccess} />
			</>
		);

	}

	if (token === null) return <></>;

	return (
		<>
			<div className="background-gradient"></div>
			<div className="container ">
				<div className="wrapper h-full flex flex-column align-items-center justify-content-center">
				{currentDisplay()}
				</div>
			</div>
		</>
	);
};
