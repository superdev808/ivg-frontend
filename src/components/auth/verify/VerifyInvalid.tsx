import { Image } from 'primereact/image';
import Link from 'next/link';
import { Button } from 'primereact/button';

export const VerifyInvalid = () => {
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

				<div className="text-900 text-6xl font-medium mb-3">Expired Link</div>

				<span className="my-4">
					<i className="pi pi-times-circle text-8xl text-red-500"></i>
				</span>
				<span className="text-600 font-medium text-xl my-4 line-height-2">The link you are using to verify your account is already expired.</span>
				<span className="text-600 font-medium text-xl my-2 line-height-2">
					<Link
						href={'/forgot-password'}
						className="text-secondary">
						Click here
					</Link>{' '}
					to get a new link. If you already verified your account, please click below to sign in with your valid credentials.
				</span>
				<span className="text-600 font-medium text-xl my-4 line-height-2">
					Still stuck? Please{' '}
					<Link
						href={'/contact'}
						className="text-secondary">
						contact us
					</Link>{' '}
					if you need additional assistance.
				</span>

				<div className="flex justify-content-center mt-8">
					<Link href={`/login`}>
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
