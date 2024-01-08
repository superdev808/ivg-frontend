import classNames from 'classnames/bind';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';

import { Button } from 'primereact/button';
import styles from './Contact.module.scss';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import FooterExtended from '@/components/layout/footer/FooterExtended';
import { HeroSection } from '@/components/public/shared/HeroSection';
import ReCAPTCHA from 'react-google-recaptcha';

const cx = classNames.bind(styles);

interface Practice {
	label: string;
	value: string;
}

export const ContactComponent = () => {
	const [isSending, setIsSending] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [visible, setVisible] = useState(false);

	const practices: Practice[] = [
		{ label: 'Dental practice', value: 'dentalPractice' },
		{ label: 'Dental lab', value: 'dentalLab' },
		{ label: 'Dental/Technician school', value: 'dentalTechnicianSchool' },
		{ label: 'Dental student', value: 'dentalStudent' },
		{ label: 'Other', value: 'other' },
	];
	const defaultValues = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		zipCode: '',
		practice: '',
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
	} = useForm({ defaultValues });

	const onSubmit = async (data) => {
		try {
			setIsSending(true);
			const values = getValues();
			const response = await fetch('/api/contactus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (response.ok) {
				console.log('Email sent successfully');
				setVisible(true);
				setIsSent(true);
				reset(); // Reset the form fields after successful submission
			} else {
				console.log('Email not sent');
			}
		} catch (error) {
			console.error('Failed to send email:', error);
			setIsSending(false);
		}
	};

	const getFormErrorMessage = (name) => {
		return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
	};
	const emailPattern = {
		value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
		message: 'Invalid email address',
	};
	return (
		<>
			<div className={cx(['public-content-container', 'section-container'])}>
				<div className={cx(['public-content-wrapper'])}>
					<form
						className="w-full p-4"
						onSubmit={handleSubmit(onSubmit)}>
						<div className="flex justify-content-between mb-4">
							<Controller
								name="firstName"
								control={control}
								rules={{ required: 'First name is required.' }}
								render={({ field, fieldState }) => (
									<div className="flex flex-column w-full  mr-2">
										<label
											htmlFor={field.name}
											className={cx({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputText
												id={field.name}
												value={field.value}
												className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
												onChange={(e) => field.onChange(e.target.value)}
											/>
											<label htmlFor={field.name}>First Name</label>
										</span>
										{getFormErrorMessage(field.name)}
									</div>
								)}
							/>

							<Controller
								name="lastName"
								control={control}
								rules={{ required: 'Last name is required.' }}
								render={({ field, fieldState }) => (
									<div className="flex flex-column w-12 ml-2">
										<label
											htmlFor={field.name}
											className={cx({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputText
												id={field.name}
												value={field.value}
												className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
												onChange={(e) => field.onChange(e.target.value)}
											/>
											<label htmlFor={field.name}>Last Name</label>
										</span>
										{getFormErrorMessage(field.name)}
									</div>
								)}
							/>
						</div>
						<div className="flex justify-content-between mb-4">
							<Controller
								name="email"
								control={control}
								rules={{ required: 'An email is required.', pattern: emailPattern }}
								render={({ field, fieldState }) => (
									<div className="flex flex-column w-full  mr-2">
										<label
											htmlFor={field.name}
											className={cx({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputText
												id={field.name}
												value={field.value}
												className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
												onChange={(e) => field.onChange(e.target.value)}
											/>
											<label htmlFor={field.name}>Email</label>
										</span>
										{getFormErrorMessage(field.name)}
									</div>
								)}
							/>
							<Controller
								name="phone"
								control={control}
								rules={{ required: 'A phone number is required.' }}
								render={({ field, fieldState }) => (
									<div className="flex flex-column w-full  ml-2">
										<label
											htmlFor={field.name}
											className={cx({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputMask
												id={field.name}
												value={field.value}
												mask="(999) 999-9999"
												className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
												onChange={(e) => field.onChange(e.target.value)}></InputMask>

											<label htmlFor={field.name}>Phone Number</label>
										</span>
										{getFormErrorMessage(field.name)}
									</div>
								)}
							/>
						</div>
						<div className="flex justify-content-between mb-4">
							<Controller
								name="zipCode"
								control={control}
								rules={{ required: 'Zip Code is required.' }}
								render={({ field, fieldState }) => (
									<div className="flex flex-column w-12 mr-2">
										<label
											htmlFor={field.name}
											className={cx({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputMask
												id={field.name}
												value={field.value}
												mask="99999"
												className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
												onChange={(e) => field.onChange(e.target.value)}></InputMask>
											<label htmlFor={field.name}>Zip Code</label>
										</span>
										{getFormErrorMessage(field.name)}
									</div>
								)}
							/>
							<Controller
								name="practice"
								control={control}
								rules={{ required: 'Practice is required.' }}
								render={({ field, fieldState }) => (
									<div className="flex flex-column w-12 ml-2">
										<label
											htmlFor={field.name}
											className={cx({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<Dropdown
												id={field.name}
												value={field.value}
												optionLabel="label"
												
												options={practices}
												focusInputRef={field.ref}
												onChange={(e) => field.onChange(e.value)}
												clearIcon
												className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
											/>
											<label htmlFor={field.name}>Dental Practice</label>
										</span>
										{getFormErrorMessage(field.name)}
									</div>
								)}
							/>
						</div>
						<div className="flex justify-content-center mb-4">
							<ReCAPTCHA
								sitekey="6Le-VT8pAAAAABQYAVJslEM9W5WHFrvU6AeMcKUX"
								// onChange={onChange}
							/>
						</div>
						<div className="flex justify-content-center">
							<Button
								type="submit"
								disabled={isSending}
								className={cx(['btn-secondary', 'xl:w-2 w-12 text-xl hover:text-secondary'])}>
								{isSending && !isSent ? (
									<>
										{' '}
										<i
											className="pi pi-spin pi-spinner"
											style={{ fontSize: '2rem', marginRight: '1rem' }}></i>{' '}
										<span>Sending...</span>
									</>
								) : isSent ? (
									'Sent!'
								) : (
									'Submit'
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
			<Dialog
				showHeader={false}
				blockScroll={true}
				draggable={false}
				className="bg-primary"
				visible={visible}
				style={{ width: '30vw', height: '20vw', background: 'var(--primary-color)' }}
				modal={true}
				onHide={() => setVisible(false)}>
				<div className="flex flex-column  align-content-center text-center">
					<div className="flex justify-content-end">
						<Button
							icon="pi pi-times"
							outlined
							rounded
							onClick={() => setVisible(false)}
							className={'border-0 mt-2 '}></Button>
					</div>
					<div className="flex justify-content-center">
						<img
							src="/images/sent.png"
							alt="sent"
							width={250}
						/>
					</div>
					<h2>Thank you for contacting us!</h2>
					<p className="text-bold">
						<strong>We have recieved your message and will be in touch shortly.</strong>
					</p>
				</div>
			</Dialog>
		</>
	);
};
