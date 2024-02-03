'use client';
import styles from '@/components/secure/settings/Settings.module.scss';
import { FormErrorMessage } from '@/components/shared/FormErrorMessage';
import { getCookie } from '@/helpers/cookie';
import { getInitials } from '@/helpers/util';
import { useGetUserInfoQuery, usePutUpdateUserInfoMutation } from '@/redux/hooks/apiHooks';
import { User, UserInfo } from '@/types/UserTypes';
import classNames from 'classnames/bind';
import { get, set } from 'lodash';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { use, useEffect, useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
const cx = classNames.bind(styles);

type FormValues = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
};


const defaultValues = {
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
};

export default function SettingsUserInfoForm() {
	const { data, refetch } = useGetUserInfoQuery({});
	const [putUpdateUserInfo, { isLoading }] = usePutUpdateUserInfoMutation();
	const [user, setUser] = useState<UserInfo>(defaultValues);
	const [updateMessage, setUpdateMessage] = useState('');
	

	useEffect(() => {
		if (!data) return;
		const userData = data.data;
		setUser(userData);
		setValue('firstName', userData.firstName);
		setValue('lastName', userData.lastName);
		setValue('phone', userData.phone);
		setValue('email', userData.email);
		setUpdateMessage('');
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

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


	const onSubmit = async (data:FormValues) => {
		try {
			await putUpdateUserInfo(data).unwrap();
			refetch();
			setUpdateMessage('Successfully updated.');
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}  className="flex flex-column justify-content-between h-full">
			<div className={cx('form', 'flex flex-column justify-content-be')}>
				<div className={cx('form-header')}>
					<span className={cx('form-title', 'mb-2')}>Profile</span>
					<span className={cx('form-subtitle')}>Update your profile, contact detials, and preferences to personalize your experience</span>
				</div>
				<div className="flex border-1 border-300 border-round-xl my-6 p-4 align-items-center">
					<Avatar
						label={user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
						shape="circle"
						className="bg-orange-100"
						style={{ width: '100px', height: '100px', fontSize: '3rem' }}
					/>

					<span className="text-2xl ml-4">{`${user?.firstName} ${user?.lastName}`}</span>
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
										className={cx({ 'p-error': errors[field.name] })}></label>
									<span className="p-float-label w-full">
										<InputText
											id={field.name}
											value={field.value}
											className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
											onChange={(e) => field.onChange(e.target.value)}
										/>
										<label htmlFor={field.name}>First Name</label>
									</span>
									{FormErrorMessage({ message: errors[field.name]?.message })}
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
										className={cx({ 'p-error': errors[field.name] })}></label>
									<span className="p-float-label w-full ">
										<InputText
											id={field.name}
											value={field.value}
											className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
											onChange={(e) => field.onChange(e.target.value)}
										/>
										<label htmlFor={field.name}>Last Name</label>
									</span>
									{FormErrorMessage({ message: errors[field.name]?.message })}
								</div>
							)}
						/>

						<div className="col-6">
							<span className="p-float-label w-full">
								<InputText
									className="w-full mb-3"
									value={user?.email}
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
										className={cx({ 'p-error': errors[field.name] })}></label>
									<span className="p-float-label w-full">
										<InputMask
											id={field.name}
											value={field.value}
											mask="(999) 999-9999"
											className={cx([{ 'p-invalid': fieldState.error }, 'w-full'])}
											onChange={(e) => field.onChange(e.target.value)}></InputMask>

										<label htmlFor={field.name}>Phone Number</label>
									</span>
									{FormErrorMessage({ message: errors[field.name]?.message })}
								</div>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="grid justify-content-end align-items-end">
				<div className="flex align-items-center">
{updateMessage && <div className="text-600 text-secondary mx-4">{updateMessage}</div>}
					<Button
						disabled={isLoading}
						type="submit"
						icon={isLoading ? 'pi pi-spin pi-spinner' : ''}
						label={'Update'}
						className=" p-button-rounded bg-secondary "
					/>
				</div>
			</div>
		</form>
	);
}
