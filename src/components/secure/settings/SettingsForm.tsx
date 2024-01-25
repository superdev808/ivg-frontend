'use client';
import styles from '@/components/secure/settings/Settings.module.scss';
import { getCookie } from '@/helpers/cookie';
import { getInitials } from '@/helpers/util';
import classNames from 'classnames/bind';
import { get } from 'lodash';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
const cx = classNames.bind(styles);

export default function SettingsForm({ currentSetting }) {
	const [title, setTitle] = useState('');
	const [icon, setIcon] = useState('');

	const name = getCookie('name');
	const userInitials = getInitials(name);
	const email = getCookie('email');

	const defaultValues = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		zipCode: '',
		type: '',
		message: '',
		recaptcha: '',
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
		setValue,
		trigger,
		register,
	} = useForm({ defaultValues });

	useEffect(() => {
		setTitle(currentSetting.label);
		setIcon(currentSetting.icon);
	}, [currentSetting]);
	const getFormErrorMessage = (name) => {
		return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
	};
	return (
		<div className={cx('form', 'flex flex-column')}>
			<div className={cx('form-header')}>
				{/* <i className={cx('icon', `${icon}`, ' mr-4 text-gray-900 font-normal')}></i> */}
				<span className={cx('form-title','mb-2')}>{title}</span>
				<span className={cx('form-subtitle')}>Update your profile, contact detials, and preferences to personalize your experience</span>
			</div>
			<div className="flex border-1 border-300 border-round-xl my-6 p-4">
					<Avatar
						label={userInitials}
						shape="circle"
						className="bg-orange-100"
						style={{ width: '100px', height: '100px', fontSize: '3rem' }}
					/>
					<div>
						<span className='text-2xl'>

						{name}
						</span>
					</div>
				</div>
			<div className="grid  justify-content-center m-0">
		

				<div className="col-12 grid">
				
			
					<Controller
						name="firstName"
						control={control}
						rules={{ required: 'First name is required.' }}
						render={({ field, fieldState }) => (
							<div className="flex flex-column col-6">
								<label
									htmlFor={field.name}
									className={cx({ 'p-error': errors.value })}></label>
								<span className="p-float-label w-full">
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
							<div className="flex flex-column col-6">
								<label
									htmlFor={field.name}
									className={cx({ 'p-error': errors.value })}></label>
								<span className="p-float-label w-full ">
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
		

					<div className="col-6">
						<span className="p-float-label w-full">
							<InputText
								className="w-full mb-3"
								value={email}
								disabled
							/>
							<label htmlFor="email">Email</label>
						</span>
					</div>

					<Controller
						name="phone"
						control={control}
						rules={{ required: 'A phone number is required.' }}
						render={({ field, fieldState }) => (
							<div className="flex flex-column  col-6 ">
								<label
									htmlFor={field.name}
									className={cx({ 'p-error': errors.value })}></label>
								<span className="p-float-label w-full">
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
			</div>
			<div className="grid justify-content-center">
				<div className="col-8 flex justify-content-end">
					<Button
						label="Update"
						className="w-3"
					/>
				</div>
			</div>
		</div>
	);
}
