import styles from './Reset.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'primereact/image';
import Link from 'next/link';
import { Button } from 'primereact/button';

import useLogout from '@/hooks/useLogout';
const cx = classNames.bind(styles);

export const ResetSuccess = () => {
	const logout = useLogout();

	
	return (
		<>
			<div className="flex flex-column w-full md:w-6 text-center">
				<Link
					href="/"
					style={{ display: 'block', textDecoration: 'none', alignSelf: 'center' }}>
					<Image
						src="/images/logo/Ivory-Guide-Logo-Horizontal.svg"
						alt="Logo"
						width={'150'}
						height={'30'}
						className="relative mb-3"
					/>
				</Link>

				<div className="text-900 text-6xl font-medium mb-3">Password Changed!</div>

				<span className="my-4">
					<i className="pi pi-check-circle text-8xl text-green-500"></i>
				</span>
				<span className="text-600 font-medium text-xl my-4 line-height-2">Your password has been successfully changed. Click below to sign in with your new credentials.</span>

				<div className="flex justify-content-center mt-8">
					
						<Button
						onClick={() =>logout}
							label="Return to login"
							className=" p-button-rounded bg-secondary "
						/>
				</div>
			</div>
		</>
	);
};
