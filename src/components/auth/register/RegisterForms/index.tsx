import { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from '../Register.module.scss';
import classNames from 'classnames/bind';

import { registerForm, RegisterForm } from './constants';

import { FirstForm } from './FirstForm';
import { SecondForm } from './SecondForm';
import { usePostRegisterUserMutation } from '@/redux/hooks/apiHooks';
import { RegisterComplete } from './Complete';
import { set } from 'lodash';
import { RegisterError } from './Error';

const cx = classNames.bind(styles);

export const RegisterFormComponent = () => {
	const [formStep, setFormStep] = useState(0);

	const [registerValues, setRegisterValues] = useState<RegisterForm>(registerForm);

	const [postRegisterUser, { isLoading, isSuccess, isError, data }] = usePostRegisterUserMutation();

	const getFormClass = (formNumber: number) => {
		if (formNumber === formStep) return 'current';
		return formNumber < formStep ? 'slideLeft' : 'slideRight';
	};

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
		<div className='h-full'>
			<div className={cx(getFormClass(0), 'formComponent')}>
				<FirstForm onSubmit={onSubmit}></FirstForm>
			</div>
			<div className={cx(getFormClass(1), 'formComponent')}>
				<SecondForm
					onSubmit={onSubmit}
					back={() => setFormStep(0)}
					isSubmitting={isLoading}></SecondForm>
			</div>
			<div className={cx(getFormClass(2), 'formComponent')}>
				<RegisterComplete/>
			</div>
			<div className={cx(getFormClass(3), 'formComponent')}>
				<RegisterError />
			</div>
		</div>
	);
};
