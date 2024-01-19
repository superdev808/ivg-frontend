import { Image } from 'primereact/image';
import styles from '../Register.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';

import { Button } from 'primereact/button';
const cx = classNames.bind(styles);
export const RegisterError = () => {
	return (
		<>
			<div className="grid h-full  flex-column  align-items-center m-0 p-0 justify-content-center mt-6 ">
				<span className="text-5xl mb-6 text-center"> We are currently experiencing issues with our service</span>
				<span className=''>
					<i className="pi pi-times-circle text-8xl text-red-500"></i>
				</span>
				<div className="text-xl text-center my-6">
					<span>
						Please refresh your page or try again later. Feel free to contact us at <a href="mailto:support@ivoryguide.com">support@ivoryguide.com</a> if the problem persists.
					</span>
				</div>
				<div className="">
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
