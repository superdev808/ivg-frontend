import Link from 'next/link';
import classNames from 'classnames/bind';

import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const FooterExtended = () => {
	const socialButtons = [
		{ icon: 'pi pi-facebook', ariaLabel: 'Facebook Link', link: '#' },
		{ icon: 'pi pi-instagram', ariaLabel: 'Instagram Link', link: '#' },
		{ icon: 'pi pi-linkedin', ariaLabel: 'LinkedIn Link', link: '#' },
	];

	return (
		<div className={cx(['px-3 md:px-8', 'flex'])}>
			<div className="grid w-full justify-content-between align-content-center my-4 py-4 border-bottom-1">
				<div className="col-12 md:col-4 flex justify-content-center md:justify-content-start">
					<Image
						src="/images/logo/Ivory-Guide-Logo-Stack.svg"
						alt="Ivory Guid Logo Stack"
						width="200"
						height={'100'}
						className="relative"
					/>
				</div>
				<div className={cx(['col-12 md:col-4 flex justify-content-center md:justify-content-center align-self-center'])}>
					{socialButtons.map((button, index) => {
						return (
							<Button
								key={index}
								pt={{
									icon: { className: cx(['socialButton']) },
								}}
								rounded
								text
								icon={button.icon}
								className={cx(['mx-2'])}
								aria-label={button.ariaLabel}
							/>
						);
					})}
				</div>
				<div className="col-12 md:col-4 flex justify-content-center md:justify-content-end align-self-center">
					<Link href="/contact">
						<Button
							outlined
							style={{ borderColor: 'var(--primary-dark-color)', color: 'var(--primary-dark-color)' }}
							className={cx('px-5 py-3 border-secondary')}>
							Contact Us
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FooterExtended;
