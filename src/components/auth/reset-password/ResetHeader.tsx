
import styles from './Reset.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'primereact/image';
import Link from 'next/link';

const cx = classNames.bind(styles);

export const ResetHeader = () => {
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
					<div className="text-900 text-3xl font-medium mb-3">Reset new password
</div>
					<span className="text-600 font-medium line-height-3">Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a symbol.</span>
				
				</div>
			</div>
		</>
	);
};
