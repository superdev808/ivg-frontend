import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

import { Button } from 'primereact/button';
import styles from './Contact.module.scss';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import FooterExtended from '@/components/footer/FooterExtended';

export const ContactComponent = () => {
	const [isSending, setIsSending] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [visible, setVisible] = useState(false);
	const defaultValues = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
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
			<div style={{ top: 0, left: 0, position: 'absolute', width: '100%', height: '600px', background: '#023932' }}>
				<div className={classNames([styles['hero-content-containter'], '  text-right xl:text-left'])}>
					<div
						className={classNames(['flex  p-0 xl:col-5 col-12 '])}
						style={{ margin: '10rem 0' }}>
						<div className="w-4 flex flex-column justify-content-center px-6">
							<Button
								icon="pi pi-linkedin"
								rounded
								outlined
								aria-label="Filter"
							/>
							<Button
								className="mt-5"
								icon="pi pi-instagram"
								rounded
								outlined
								aria-label="Filter"
							/>
							<Button
								className="mt-5"
								icon="pi pi-facebook"
								rounded
								outlined
								aria-label="Filter"
							/>
						</div>
						<div className="w-6 flex flex-column justify-content-center ">
							<h1 className=" text-primary text-5xl xl:text-7xl">Contact Us</h1>
							<div className="flex w-full lg:block lg:w-0 xl:justify-content-center justify-content-end mb-5  ">
								<Button className={classNames([styles.button, 'xl:w-6 w-12 hover:bg-primary  '])}>Request a Demo</Button>
							</div>
						</div>
					</div>

					<div className={classNames(['xl:col-5', 'col-12 p-0'])}>
						<div className={classNames([styles['hero-image-container']])}>
							<div className={classNames([styles['hero-image']])}></div>
						</div>
					</div>
				</div>

				{/* <div
				style={{
                    position: 'relative',
                    top: '0',
                    right: '0',
                    zIndex: 9999,
					width: '100%',
					height: '100%',
					background: '#83B899',
					boxShadow: '450px 450px 450px',
					borderRadius: '9999px',
					filter: 'blur(450px)',
				}}></div> */}
			</div>
			<div className={classNames([styles['wrapper']])}>
				<div className={classNames([styles['content-container']])}>
					<p className={classNames([styles['content-text'], 'text-center m-8'])}>
						Eager to learn how our product can transform your dental business? Please email <strong>info@ivoryguide.com</strong> with the following
						information and a few details about how we can help, and we will respond ASAP!
					</p>
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
											className={classNames({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputText
												id={field.name}
												value={field.value}
												className={classNames([{ 'p-invalid': fieldState.error }, 'w-full'])}
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
											className={classNames({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputText
												id={field.name}
												value={field.value}
												className={classNames([{ 'p-invalid': fieldState.error }, 'w-full'])}
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
											className={classNames({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputText
												id={field.name}
												value={field.value}
												className={classNames([{ 'p-invalid': fieldState.error }, 'w-full'])}
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
											className={classNames({ 'p-error': errors.value })}></label>
										<span className="p-float-label w-full mb-2">
											<InputMask
												id={field.name}
												value={field.value}
												mask="(999) 999-9999"
												className={classNames([{ 'p-invalid': fieldState.error }, 'w-full'])}
												onChange={(e) => field.onChange(e.target.value)}></InputMask>

											<label htmlFor={field.name}>Phone Number</label>
										</span>
										{getFormErrorMessage(field.name)}
									</div>
								)}
							/>
						</div>
						{/* <div className="flex justify-content-between mb-4">
							<InputText
								placeholder="Company Name"
								className="w-full "></InputText>
						</div>
						<div className="flex justify-content-between mb-4">
							<InputText
								placeholder="Location"
								className="w-full "></InputText>
						</div> */}
						<div className="flex justify-content-center">
							<Button
								type="submit"
								disabled={isSending}
								className={classNames([styles.button, 'xl:w-2 w-12 hover:bg-primary  '])}>
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
				<div
					className={classNames('grid my-6 py-6 w-full text-primary')}
					style={{ background: 'var(--primary-dark-color)' }}>
					<div className="col-12 flex flex-column align-items-center">
						<p className={classNames('landing-missing-section-title', 'my-2 px-2 text-xl md:text-6xl')}>What are we missing?</p>
						<p className={classNames('landing-missing-section-description', 'my-1 px-2 text-lg md:text-xl text-center')}>
							Request a Workflow, Calculator, or additional feature{' '}
							<b>
								<u>here</u>
							</b>
							.
						</p>
					</div>
				</div>
				<FooterExtended />
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
                    <div className='flex justify-content-center'>

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
