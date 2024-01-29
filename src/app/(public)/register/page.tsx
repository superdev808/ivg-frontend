'use client';
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import { RegisterContent } from '@/components/auth/register/RegisterContent';



type UserInfo = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
};

export default function SignUpPage() {
	const [loading, setLoading] = useState<boolean>(false);
	const errorMsgs = useRef(null);
	const toastRef = useRef(null);

	const defaultValues: UserInfo = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: '',
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({ defaultValues });

	const getFormErrorMessage = (name: string) => {
		type errors = { [key: string]: { message: string } };
		return (errors as errors)[name] ? (
			<small className="p-error">{(errors as errors)[name].message}</small>
		) : (
			<small className="p-error">&nbsp;</small>
		);
	};

	const addError = (error: string) => {
		(errorMsgs.current as any).show([{ severity: 'error', detail: error, sticky: false, closable: true, unstyled: true }]);
	};

	const onSubmit = async (values: UserInfo) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			const data = await response.json();
			if (response.ok && toastRef.current) {
				(toastRef.current as any).show({ severity: 'success', summary: 'Sign Up Successed', detail: 'Go to Login Page', life: 3000 });
			} else {
				throw new Error(data.error);
			}
		} catch (error: any) {
			addError(error?.message ?? '');
			setLoading(false);
		}
	};

	const renderSignUpFormField = (name: keyof UserInfo, type: string, text: string) => {
		return (
			<Controller
				name={name}
				control={control}
				rules={{ required: `${text} is required.` }}
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
								type={type}
							/>
							<label htmlFor={field.name}>{text}</label>
						</span>
						{getFormErrorMessage(field.name)}
					</>
				)}
			/>
		);
	};

	return (
            <RegisterContent />


		// <div className="flex  align-items-center justify-content-center">
		// 	<div className="p-4 border-round w-full lg:w-5">
		// 		<div className="text-center">
		// 			<Link
		// 				href="/"
		// 				style={{ display: 'block', textDecoration: 'none', alignSelf: 'center' }}>
		// 				<Image
		// 					src="/Ivory-Guide-Logo-Horizontal.svg"
		// 					alt="Logo"
		// 					width={'150'}
		// 					height={'30'}
		// 					className="relative mb-3"
		// 				/>
		// 			</Link>
		// 			<div className="text-900 text-3xl font-medium mb-3">Welcome to Ivory Guide</div>
		// 		</div>
		// 		<div className="w-full my-4">
		// 			<Messages ref={errorMsgs} />
		// 		</div>
		// 		<form onSubmit={handleSubmit(onSubmit)}>
		// 			<div className="grid p-4">
		// 				<div className="col-12 md:col-6 md:col-offset-3">{renderSignUpFormField('firstName', 'text', 'First Name')}</div>
		// 				<div className="col-12 md:col-6 md:col-offset-3">{renderSignUpFormField('lastName', 'text', 'Last Name')}</div>
		// 				<div className="col-12 md:col-6 md:col-offset-3">{renderSignUpFormField('email', 'text', 'Email')}</div>
		// 				<div className="col-12 md:col-6 md:col-offset-3">{renderSignUpFormField('password', 'password', 'Password')}</div>
		// 				<div className="col-12 md:col-6 md:col-offset-3">
		// 					<Controller
		// 						name={'role'}
		// 						control={control}
		// 						rules={{ required: `Role is required.` }}
		// 						render={({ field, fieldState }) => (
		// 							<>
		// 								<label
		// 									htmlFor={field.name}
		// 									className={classNames({ 'p-error': errors[field.name] })}></label>
		// 								<span className="p-float-label">
		// 									<Dropdown
		// 										id={field.name}
		// 										onChange={(e) => {
		// 											field.onChange(e.value);
		// 										}}
		// 										className={classNames({ 'p-invalid': fieldState.error, 'w-full': true })}
		// 										editable
		// 										options={['General', 'Admin']}
		// 										value={field.value}
		// 									/>
		// 									<label htmlFor={field.name}>Role</label>
		// 								</span>
		// 								{getFormErrorMessage(field.name)}
		// 							</>
		// 						)}
		// 					/>
		// 				</div>
		// 				<div className="col-12 md:col-6 md:col-offset-3">
		// 					<Button
		// 						disabled={loading}
		// 						className="w-full justify-content-center">
		// 						{loading ? (
		// 							<i
		// 								className="pi pi-spin pi-spinner"
		// 								style={{ fontSize: '2rem' }}></i>
		// 						) : (
		// 							<>
		// 								<span className="mx-4">Sign Up</span>
		// 							</>
		// 						)}
		// 					</Button>
		// 				</div>
		// 			</div>
		// 		</form>
		// 	</div>
		// 	<Toast
		// 		ref={toastRef}
		// 		position="top-center"
		// 	/>
		// </div>
	);
}
