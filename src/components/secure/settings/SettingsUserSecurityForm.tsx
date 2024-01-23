'use client';
import styles from '@/components/secure/settings/Settings.module.scss';
import {  usePostSendResetPasswordMutation, usePutUpdateUserInfoMutation } from '@/redux/hooks/apiHooks';

import classNames from 'classnames/bind';
import { set } from 'lodash';
import { Button } from 'primereact/button';
import {  useState } from 'react';
const cx = classNames.bind(styles);

const defaultValues = {
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
};

export default function SettingsUserSecurityForm() {
	const [updateMessage, setUpdateMessage] = useState('');

	const [postSendResetPassword, { isLoading }] = usePostSendResetPasswordMutation();
	





	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await postSendResetPassword({}).unwrap();
			setUpdateMessage('Password reset email sent');
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<form   className="flex flex-column justify-content-between h-full">
			<div className={cx('form', 'flex flex-column justify-content-be')}>
				<div className={cx('form-header')}>
					<span className={cx('form-title', 'mb-2')}>Password & Security</span>
					<span className={cx('form-subtitle')}>Change your password or update your security settings.</span>
				</div>
				<div className="flex border-1 border-300 border-round-xl my-6 p-4 align-items-center">
				
				<div className="flex align-items-center w-full">
					<Button
						disabled={updateMessage !== ''}
						onClick={(e) => onSubmit(e)}
						icon={isLoading ? 'pi pi-spin pi-spinner' : ''}
						label={'Change your password'}
						className=" p-button-rounded bg-secondary "
						/>
						{updateMessage && <div className="text-600 text-secondary mx-4">{updateMessage}</div>}
				</div>
		
				</div>
			
			</div>
			
		</form>
	);
}
