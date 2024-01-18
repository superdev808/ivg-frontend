import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const ContactInfoSection = () => {
	return (
		<>
			<div className={cx(['section-container', 'mb-0'])}>
				<div style={{ maxWidth: '800px' }}>
					<p className={cx(['public-section-content-2xl text-center'])}>
						Eager to learn how our product can transform your dental business? Please submit the form below, and we will respond ASAP!
					</p>
				</div>
			</div>
		</>
	);
};
