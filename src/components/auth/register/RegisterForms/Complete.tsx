import { Image } from 'primereact/image';
import styles from '../Register.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';

import { Button } from 'primereact/button';
const cx = classNames.bind(styles);
export const RegisterComplete = () => {
	return (
		<>
			<div className="grid flex-column justify-content-center h-full align-content-center">
				<span className="text-6xl mb-6 text-center">Thank you for registering!</span>
				<span className='text-center'>
					<i className="pi pi-check-circle text-8xl"></i>
				</span>
				<div className="text-2xl text-center my-6">
					<span>
						Your account has been created and a verification email has been sent to your registered email address. Please click the verification link included
						in the email to activate your account.
					</span>
				</div>
				<div className="text-center">
                    <Link
                    href={`/login`}
                    >
                    
					<Button
						
						label="Return to login"
						className=" p-button-rounded bg-secondary "
                        />
                        </Link>
				</div>
			</div>
		</>
	);
};
