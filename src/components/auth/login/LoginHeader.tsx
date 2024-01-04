
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'primereact/image';
import Link from 'next/link';

const cx = classNames.bind(styles);

export const LoginHeader = () => {
	return (
		<>
			<div className="">
				<div className="text-center">
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
					<div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
					<span className="text-600 font-medium line-height-3">{"Don't have an account?"}</span>
					<Link
						href="/signup"
						className="font-medium no-underline ml-2 text-primary-500 cursor-pointer">
						Get Started!
					</Link>
				</div>
			</div>
		</>
	);
};
