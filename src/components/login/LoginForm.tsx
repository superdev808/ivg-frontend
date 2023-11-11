'use client';

import { redirect, useSearchParams,useRouter } from 'next/navigation';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ChangeEvent, useState } from 'react';
import { classNames } from 'primereact/utils';

import { Controller, useForm } from 'react-hook-form';
import { NextResponse } from 'next/server';

type FormValues = {
	email: string;
	password: string;
};
export const LoginForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const defaultValues: FormValues = {
		email: '',
		password: '',
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
	} = useForm({ defaultValues });

	const getFormErrorMessage = (name: string) => {
		type errors = { [key: string]: { message: string } };
		return (errors as errors)[name] ? (
			<small className="p-error">{(errors as errors)[name].message}</small>
		) : (
			<small className="p-error">&nbsp;</small>
		);
	};

	const [error, setError] = useState('');

	const searchParams = useSearchParams();
	const callbackUrl =  '/workflows';

	const onSubmit = async (d: FormValues) => {
		try {
			setLoading(true);
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: d.email, password: d.password }),
				
			});
			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.error);
			}
		
			setError('Success');
			setLoading(false);
			router.push( '/workflows' );
			window.location.reload();
		} catch (error: any) {
			setError(error?.message ?? '');

			setLoading(false);
			return null
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-4">
					<Controller
						name="email"
						control={control}
						rules={{ required: 'Email is required.' }}
						render={({ field, fieldState }) => (
							<>
								<label
									htmlFor={field.name}
									className={classNames({ 'p-error': errors[field.name] })}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										value={field.value}
										className={classNames({ 'p-invalid': fieldState.error, 'w-full': true })}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Email</label>
								</span>
								{getFormErrorMessage(field.name)}
							</>
						)}
					/>
				</div>
				<div className="mb-2">
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
				<div className="w-full mb-1 text-center text-sm text-red-600">{error}</div>

				<Button
					disabled={loading}
					label={loading ? 'loading...' : 'Sign In'}
					icon="pi pi-user"
					className="my-5 w-full"
				/>
			</form>
		</>
	);
};
