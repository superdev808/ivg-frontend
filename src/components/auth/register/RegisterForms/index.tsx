import { useEffect, useState } from 'react';

import styles from '../Register.module.scss';
import classNames from 'classnames/bind';

import { registerForm, RegisterForm } from './constants';

import { FirstForm } from './FirstForm';
import { SecondForm } from './SecondForm';
import { usePostRegisterUserMutation } from '@/redux/hooks/apiHooks';
import { RegisterComplete } from './Complete';
import { RegisterError } from './Error';

const cx = classNames.bind(styles);

export const RegisterFormComponent = () => {
	const [formStep, setFormStep] = useState(0);
	const [registerValues, setRegisterValues] = useState<RegisterForm>(registerForm);
	const [postRegisterUser, { isLoading, isSuccess, isError }] = usePostRegisterUserMutation();

	const onSubmit = (data: any) => {
		if (formStep === 0) {
			setFormStep(1);
			setRegisterValues({ ...registerValues, ...data });
		}
		if (formStep === 1) {
			setRegisterValues({ ...registerValues, ...data });
			postRegisterUser({ ...registerValues, ...data });
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setFormStep(2);
		}
		if (isError) {
			setFormStep(3);
		}
	}, [isSuccess, isError]);

	return (
		<div className="h-full grid p-0 m-0 justify-content-center">
			<div className={cx('col-11 md:col-8 mt-8', { hidden: formStep !== 0 })}>
				<FirstForm onSubmit={onSubmit}></FirstForm>
			</div>

			<div className={cx('col-11 md:col-8 mt-8', { hidden: formStep !== 1 })}>
				<SecondForm
					onSubmit={onSubmit}
					back={() => setFormStep(0)}
					isSubmitting={isLoading}></SecondForm>
			</div>

			<div className={cx('col-11 md:col-8 mt-8', { hidden: formStep !== 2 })}>
				<RegisterComplete />
			</div>

			<div className={cx('col-11 md:col-8 mt-8', { hidden: formStep !== 3 })}>
				<RegisterError />
			</div>
		</div>
	);
};
