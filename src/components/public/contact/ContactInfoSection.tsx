import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const ContactInfoSection = () => {
	return (
		<>
			<div className={cx(['public-content-container', 'section-container', 'mb-0'])}>
				<div className={cx('public-content-wrapper')}>
					<p className={cx(['public-section-content-2xl'])}>
						Eager to learn how our product can transform your dental business? Please submit the form below, and we will respond ASAP!
					</p>
				</div>
			</div>
		</>
	);
};
