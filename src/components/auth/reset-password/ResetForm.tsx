'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { FormEvent } from 'primereact/ts-helpers';

import { redirect, useSearchParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { Controller, useForm } from 'react-hook-form';
import { NextResponse } from 'next/server';
import { set } from 'lodash';

type FormValues = {
	password: string;
	confirm: string;
};
export default function ResetForm() {
	const router = useRouter();
	const [accessToken, setAccessToken] = useState('');
	const [refreshToken, setRefreshToken] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const defaultValues: FormValues = {
		password: '',
		confirm: '',
	};
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
	} = useForm({ defaultValues });

	useEffect(() => {
		setLoading(true);
		// Get the access token and refresh token from the URL
		if (typeof window !== 'undefined') {
			const hashParams = new URLSearchParams(window.location.hash.substring(1));
			setAccessToken(hashParams.get('access_token') || '');
			setRefreshToken(hashParams.get('refresh_token') || '');
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		// Authenticate the user using the access token and refresh token
		const getSessionWithTokens = async () => {
			if (accessToken && refreshToken) {
				const { data, error } = await supabase.auth.setSession({
					access_token: accessToken,
					refresh_token: refreshToken,
				});

				if (error) {
					alert(`Error signing in: ${error.message}`);
				}
			}
		};

		// Call this function only when accessToken and refreshToken are available.
		if (accessToken && refreshToken) {
			getSessionWithTokens();
		}
	}, [accessToken, refreshToken]);

	const getFormErrorMessage = (name: string) => {
		type errors = { [key: string]: { message: string } };
		return (errors as errors)[name] ? (
			<small className="p-error">{(errors as errors)[name].message}</small>
		) : (
			<small className="p-error">&nbsp;</small>
		);
	};

	const handlePasswordUpdate = async (d: FormValues) => {
		try {
			setLoading(true);
			if (!passwordRegex.test(d.password)) {
				setError(
					'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.'
				);
				setLoading(false);
				return;
			}

			if (d.password !== d.confirm) {
				setError('Passwords do not match.');
				setLoading(false);
				return;
			}

			const response = await fetch('/api/auth/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password: d.password }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error);
			}

			setError('Success');
			setLoading(false);
			router.push('/workflows');
			window.location.reload();
		} catch (error: any) {
			setError(error?.message ?? '');

			setLoading(false);
			return null;
		}
	};
	const expiredLink = () => { 

		return <div className='text-center w-full'>
			<i className="pi pi-times-circle text-red-400" style={{ fontSize: '5rem' }}></i>

			<h1>Expired Link</h1>
			<p>

				Your request to reset your password has expired. Please try again.
			</p>

		</div>

	}
	if (!loading && (!accessToken || !refreshToken)) {
		return expiredLink();
	}
	return (
		<><div className="text-900 text-3xl font-medium mb-3">Reset your password</div>
		<div className='mb-4'>

		<small >Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a symbol.</small>

		</div>
			
			
			
			<form onSubmit={handleSubmit(handlePasswordUpdate)}>
				<div className='mb-2'>
					<Controller
						name="password"
						control={control}
						rules={{ required: 'Password is required.' }}
						render={({ field, fieldState }) => (
							<>
								<label
									htmlFor={field.name}
									className={classNames({ 'p-error': errors[field.name] })}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										type="password"
										value={field.value}
										className={classNames({ 'p-invalid': fieldState.error, 'w-full': true })}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Password</label>
								</span>
								{getFormErrorMessage(field.name)}
							</>
						)}
					/>
					</div>
					<div className='mb-2'>
					<Controller
						name="confirm"
						control={control}
						rules={{ required: 'Confirm your password.' }}
						render={({ field, fieldState }) => (
							<>
								<label
									htmlFor={field.name}
									className={classNames({ 'p-error': errors[field.name] })}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										type="password"
										value={field.value}
										className={classNames({ 'p-invalid': fieldState.error, 'w-full': true })}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Confirm Password</label>
								</span>
								{getFormErrorMessage(field.name)}
							</>
						)}
					/>

					<div className="mb-2"></div>
					<div className="w-full mb-1 text-center text-sm text-red-600">{error}</div>

					<Button
						disabled={loading}
						label={loading ? 'loading...' : 'Reset Password'}
						
						className="my-5 w-full"
					/>
				</div>
			</form>
		</>
	);
}
