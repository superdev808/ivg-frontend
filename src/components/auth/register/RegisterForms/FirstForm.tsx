import { FormErrorMessage } from '@/components/shared/FormErrorMessage';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { FieldErrors, useForm } from 'react-hook-form';

import styles from '../Register.module.scss';
import classNames from 'classnames/bind';
import { InputText } from 'primereact/inputtext';
import { Controller } from 'react-hook-form';
import { InputMask } from 'primereact/inputmask';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePostCheckEmailMutation } from '@/redux/hooks/apiHooks';
import RegisterFooter from './Footer';

const cx = classNames.bind(styles);

type FormValues = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	agree: boolean;
};

type FormErrors = FieldErrors<FormValues>;

const defaultValues: FormValues = {
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
	password: '',
	agree: false,
};

export const FirstForm = ({ onSubmit }: { onSubmit: (data: FormValues) => void }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [emailNotTaken, setEmailNotTaken] = useState<boolean | null>(null);
	const [postCheckEmail] = usePostCheckEmailMutation();
	const [isLoading, setIsLoading] = useState(false);

	const handleCheckEmail = async (data: FormValues) => {
		setIsLoading(true);

		try {
			const res = await postCheckEmail(data.email).unwrap();
			if (res.available === true) {
				setEmailNotTaken(true);
				onSubmit(data);
			}
			setIsLoading(false);
		} catch (err: any) {
			if (err.data?.message.available === false) {
				setEmailNotTaken(false);
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (emailNotTaken === null || emailNotTaken) return;
		trigger('email');
	}, [emailNotTaken]); // eslint-disable-line react-hooks/exhaustive-deps

	const {
		control,
		formState: { errors },
		handleSubmit,
		trigger,
		clearErrors,
	} = useForm<FormValues>({ defaultValues, mode: 'onSubmit', reValidateMode: 'onSubmit' });

	return (
		<form
			className={cx('grid m-0 p-0 justify-content-center h-full')}
			onSubmit={handleSubmit((e) => handleCheckEmail(e))}>
			<span className="col-12 text-center text-2xl text-secondary">Create your account</span>
			<span className="col-12 text-center p-0 text-gray-600 mb-6">Please fill the form below to create an account.</span>
			<div className="col-12 p-0 grid m-0">
				<Controller
					name="firstName"
					control={control}
					rules={{ required: 'First Name is required.' }}
					render={({ field, fieldState }) => (
						<div className="flex flex-column  col-12 md:col-6 p-0 md:pr-2 mb-4">
							<label
								htmlFor={field.name}
								className={cx({ 'p-error': errors[field.name] }, 'w-full')}></label>
							<span className="p-float-label">
								<InputText
									id={field.name}
									className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
									{...field}
								/>
								<label htmlFor={field.name}>First Name</label>
							</span>
							{fieldState.error ? (
								<div className="">
									<FormErrorMessage message={errors[field.name]?.message} />
								</div>
							) : null}
						</div>
					)}
				/>
				<Controller
					name="lastName"
					control={control}
					rules={{ required: 'Last Name is required.' }}
					render={({ field, fieldState }) => (
						<div className="flex flex-column  col-12 md:col-6  p-0 md:pl-2 mb-4">
							<label
								htmlFor={field.name}
								className={cx({ 'p-error': errors[field.name] })}></label>
							<span className="p-float-label">
								<InputText
									id={field.name}
									className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
									{...field}
								/>
								<label htmlFor={field.name}>Last Name</label>
							</span>
							{fieldState.error ? (
								<div className="">
									<FormErrorMessage message={errors[field.name]?.message} />
								</div>
							) : null}
						</div>
					)}
				/>
				<Controller
					name="phone"
					control={control}
					rules={{
						required: 'A phone number is required.',
					}}
					render={({ field, fieldState }) => (
						<div className="flex flex-column col-12 p-0 mb-4">
							<label
								htmlFor={field.name}
								className={cx({ 'p-error': errors.phone })}></label>
							<span className="p-float-label w-full">
								<InputMask
									id={field.name}
									value={field.value}
									mask="(999) 999-9999"
									className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
									onChange={(e) => field.onChange(e.target.value)}></InputMask>

								<label htmlFor={field.name}>Phone Number</label>
							</span>
							{fieldState.error ? (
								<div className="">
									<FormErrorMessage message={errors[field.name]?.message} />
								</div>
							) : null}
						</div>
					)}
				/>
				<Controller
					name="email"
					control={control}
					rules={{
						required: 'Email is required.',

						validate: () => emailNotTaken || 'This email is already taken.',
						pattern: {
							value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: 'Invalid email address',
						},
					}}
					render={({ field, fieldState }) => (
						<div className="flex flex-column  col-12 p-0">
							<label
								htmlFor={field.name}
								className={cx({ 'p-error': errors[field.name] })}></label>
							<span className="p-float-label">
								<InputText
									id={field.name}
									onInput={(e: any) => {
										clearErrors('email');
										setEmailNotTaken(true);
									}}
									className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
									{...field}
								/>
								<label htmlFor={field.name}>Email</label>
							</span>
							{fieldState.error ? (
								<div className="mb-3">
									<FormErrorMessage message={errors[field.name]?.message} />
								</div>
							) : (
								<span className="mt-2 mb-4 text-gray-500 text-sm">
									Please use an email associated with your dental practice, lab, school, etc. in order for us to validate your involvement.
								</span>
							)}
						</div>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{
						required: 'Password is required.',
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							message: 'Password must be at least 8 characters long, including at least 1 letter, 1 number, and 1 special character',
						},
					}}
					render={({ field, fieldState }) => (
						<div className="flex flex-column col-12 p-0">
							<label
								htmlFor={field.name}
								className={cx({ 'p-error': errors[field.name] })}></label>
							<span className="p-float-label p-input-icon-right">
								<i
									onClick={() => setShowPassword(!showPassword)}
									className={cx({ 'pi pi-eye': !showPassword }, { 'pi pi-eye-slash': showPassword })}
								/>

								<InputText
									type={!showPassword ? 'password' : 'text'}
									id={field.name}
									className={cx({ 'p-invalid': fieldState.error, 'w-full': true })}
									{...field}
								/>
								<label htmlFor={field.name}>Password</label>
							</span>

							{fieldState.error ? (
								<div className="mb-2">
									<FormErrorMessage message={errors[field.name]?.message} />
								</div>
							) : (
								<span className="mt-2 mb-4  text-gray-500 text-sm">Min. 8 characters, 1 letter, 1 number and 1 special character</span>
							)}
						</div>
					)}
				/>
			</div>
			<div className="col-12 grid m-0 p-0  mt-4 justify-content-center">
				<Controller
					name="agree"
					control={control}
					rules={{ required: 'Accept is required.' }}
					render={({ field, fieldState }) => (
						<div className="grid col-12 justify-content-center md:col m-0 p-0">
							<label
								htmlFor={field.name}
								className={cx({ 'p-error': errors[field.name] })}></label>
							<Checkbox
								inputId={field.name}
								checked={field.value}
								inputRef={field.ref}
								className={cx({ 'p-invalid': fieldState.error }, 'mr-2')}
								onChange={(e) => field.onChange(e.checked)}
							/>
							<span className="text-center text-600 text-sm">
								I accept the{' '}
								<Link
									href={'/agreement'}
									className="text-600 font-bold"
									target="_blank"
									style={{ textDecorationColor: 'var(--gray-600)' }}>
									Terms of Use
								</Link>{' '}
								and have read the{' '}
								<Link
									href={'/privacy-policy'}
									target="_blank"
									className="text-600 font-bold"
									style={{ textDecorationColor: 'var(--gray-600)' }}>
									Privacy Notice
								</Link>
							</span>
						</div>
					)}
				/>
			</div>
			<div className="grid mt-6">
				<div>
					<Button
						type="submit"
						outlined
						disabled={isLoading}
						icon={isLoading ? 'pi pi-spin pi-spinner' : ''}
						label="Continue"
						className="p-button-rounded bg-secondary"
						style={{ width: '200px' }}
					/>
				</div>
			</div>
			<div className="col-12 flex justify-content-center mt-4">
				<span className="text-center p-0 text-gray-600">
					Already have an account?{' '}
					<Link
						href={'/login'}
						className="no-underline text-secondary">
						Sign In
					</Link>
				</span>
			</div>
			<div className="col-12 flex-grow-1 flex align-items-end justify-content-center">
				<RegisterFooter />
			</div>
		</form>
	);
};
