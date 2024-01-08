import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const ContactInfoSection = () => {

	return (
		<>
		<div className={cx(['public-content-container','section-container'])}>
			<div className={cx('public-content-wrapper')}>

		<p className={cx(['public-section-content-2xl'])}>
						Eager to learn how our product can transform your dental business? Please email <strong>info@ivoryguide.com</strong> with the following
						information and a few details about how we can help, and we will respond ASAP!
					</p>

			</div>
					</div>
		</>
	);
};
