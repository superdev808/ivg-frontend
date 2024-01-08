import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Image } from 'primereact/image';

const cx = classNames.bind(styles);

export const HomePlatformSection = () => {
	return (
		<>
			<div className={cx(['public-content-container', 'section-container'])}>
				<div className="public-content-wrapper flex-column align-items-center  justify-content-center text-center">
					<span className={cx(['col-12 md:col-8', 'public-section-title'])}>Our Platform</span>
					<span className={cx(['col-12 md:col-8', 'public-section-content-2xl'])}>
						With&nbsp;
						<u className="font-bold">Ivory Guide</u>, you gain easy and instantaneous access to trustworthy clinical and manufacturer recommendations,
						allowing you to easily troubleshoot cases and develop treatment plans while your patient is in the chair.
					</span>
				</div>
			</div>
		</>
	);
};
