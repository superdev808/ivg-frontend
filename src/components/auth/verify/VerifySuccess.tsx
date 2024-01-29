import { Image } from 'primereact/image';
import Link from 'next/link';
import { Button } from 'primereact/button';

export const VerifySuccess = () => {
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

				<div className="text-900 text-6xl font-medium mb-3">Verification Successful!</div>

				<span className="my-4">
					<i className="pi pi-thumbs-up text-8xl text-green-500"></i>
				</span>
				<span className="text-600 font-medium text-xl my-4 line-height-2">
					Thank you for verifying your account. Click below to sign in to your account.
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
