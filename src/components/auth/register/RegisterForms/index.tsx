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
			postRegisterUser({...registerValues, ...data});
			
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
		<>
			<div className={cx('form-container', 'grid  flex-column justify-content-end')}>
				<div className={cx(getFormClass(0), 'formComponent', 'col-6 flex justify-content-center')}>
					<div className="col-9">
						<FirstForm onSubmit={onSubmit}></FirstForm>
					</div>
				</div>
				<div className={cx(getFormClass(1), 'formComponent', 'col-6 flex justify-content-center')}>
					<div className="col-9 flex">
						<SecondForm
							onSubmit={onSubmit}
							back={() => setFormStep(0)}
							isSubmitting={isLoading}></SecondForm>
					</div>
				</div>
				<div className={cx(getFormClass(2), 'formComponent', 'col-6 flex justify-content-center')}>
					<div className="col-9">
						<RegisterComplete></RegisterComplete>
					</div>
				</div>
				<div className={cx(getFormClass(3), 'formComponent', 'col-6 flex justify-content-center')}>
					<div className="col-9">
						<RegisterError/>
					</div>
				</div>
				<div className="col-12 grid m-0  justify-content-center mb-3 z-2">
					{formStep === 0 && (
						<span className="text-center p-0 text-gray-600">
							Already have an account?{' '}
							<Link
								href={'/login'}
								className="no-underline text-secondary">
								Sign In
							</Link>
						</span>
					)}
				</div>
			</div>
		</>
	);
};
