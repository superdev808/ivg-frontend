'use client';

import { useRouter } from 'next/navigation';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState, useRef } from 'react';
import { classNames } from 'primereact/utils';

import { Controller, useForm } from 'react-hook-form';
import { NextResponse } from 'next/server';
import Link from 'next/link';
import Image from 'next/image';
import { Checkbox } from 'primereact/checkbox';
import { Messages } from 'primereact/messages';
import { setCookie } from '@/helpers/cookie';
import { useDispatch } from 'react-redux';

type FormValues = {
	email: string;
	password: string;
};
export const LoginForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const errorMsgs = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		const remembered = localStorage.getItem('rememberMe') === 'true';
		if (remembered) {
			setValue('email', localStorage.getItem('username') || '');
			setRememberMe(remembered);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const defaultValues: FormValues = {
		email: '',
		password: '',
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		getValues,
	} = useForm({ defaultValues });

	const getFormErrorMessage = (name: string) => {
		type errors = { [key: string]: { message: string } };
		return (errors as errors)[name] ? (
			<small className="p-error">{(errors as errors)[name].message}</small>
		) : (
			<small className="p-error">&nbsp;</small>
		);
	};



	const onSubmit = async (d: FormValues) => {
		try {
			setLoading(true);

			if (rememberMe) {
				localStorage.setItem('rememberMe', 'true');
				localStorage.setItem('username', getValues('email'));
			} else {
				localStorage.removeItem('rememberMe');
				localStorage.removeItem('username');
			}

			const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: d.email, password: d.password }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error);
			}

			setCookie("appToken", data.token);
			setCookie("email", data.user.email);
			dispatch({ type: 'auth/setAuth', payload: { authenticated: true } });

			router.push('/calculators');
			setLoading(false);
		} catch (error: any) {
			addError(error?.message ?? '');

			setLoading(false);
			return null;
		}
	};

    const addError = (error:string) => {
		(errorMsgs.current as any).show([
            { severity: 'error',  detail: error, sticky: false, closable: true, unstyled:true},
        ]);
    };
	return (
		<>

			<div className='w-20rem my-4'>
			{ <Messages ref={errorMsgs}/>}

			</div>

			<form  onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-3'>

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
				
				<div className='mb-3'>

				
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
				<div className="flex align-items-center justify-content-between mb-6 mt-2">
					<div className="flex align-items-center">
						<Checkbox
							id="rememberme"
							onChange={(e) => setRememberMe(e.checked || false)}
							checked={rememberMe}
							className="mr-2"
						/>
						<label htmlFor="rememberme">Remember me</label>
					</div>
					<a className="font-medium no-underline ml-2 text-primary-500 text-right cursor-pointer">Forgot your password?</a>
				</div>
				
				<div className="flex w-full justify-content-center">
					<Button
					disabled={loading}
						className="w-full lg:w-8  justify-content-center">
						{loading ? (
							<i
								className="pi pi-spin pi-spinner"
								style={{ fontSize: '2rem' }}></i>
						) : (
							<>
							<span className="mx-4">Sign In</span>
							</>
						)}
					</Button>
				</div>
			</form>
		</>
	);
};
