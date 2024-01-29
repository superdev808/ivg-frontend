import styles from './Forgot.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'primereact/image';
import Link from 'next/link';
import { Button } from 'primereact/button';

const cx = classNames.bind(styles);

export const ForgotComplete = ({requestedEmail}: {requestedEmail: string | null}) => {
	return (
		<>
			<div className="flex flex-column w-full md:w-5 text-center">
			
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
					<div className="text-900 text-6xl font-medium mb-3">Check your email</div>
					<span className="text-600 font-medium text-xl my-4">We sent password reset instructions to:</span>
                    
                        <span className="font-medium text-2xl my-4">
                            {requestedEmail}

                        </span>

                    
		
					<span className='text-600 font-medium text-xl my-4'>
						If it doesn’t arrive soon, check your spam folder. Please <Link href={'/contact'}>contact us</Link> if you need additional assistance.
					</span>
				
				<div className="flex justify-content-center mt-8">
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
