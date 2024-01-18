import classNames from 'classnames/bind';
import styles from './CTASection.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

type CTASectionProps = {
	title?: string;
	text?: JSX.Element;
};

export const CTASection = ({ title, text }: CTASectionProps) => {
	return (
		<div className={cx(['cta-container'])}>
			<div className={cx('flex flex-column align-items-center px-4 my-6 md:py-6 text-center')}>
				<span className={cx('my-2 px-2 text-2xl md:text-6xl font-bold text-primary')}>{title}</span>

				<span className={cx('my-1 mx-2 text-lg md:text-xl text-center')}>{text}</span>
			</div>
		</div>
	);
};
