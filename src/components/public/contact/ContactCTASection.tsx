import { CTASection } from '../shared/CTASection';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);


export const ContactCTASection = () => {
	const title: string = 'What are we missing?';
	const text: JSX.Element = (
		<>
			Request an additional Calculator or feature.&nbsp;
			<Link href="/contact">
				<span className="font-bold text-primary underline">here</span>
			</Link>
		</>
	);
	return (
		<CTASection
			text={text}
			title={title}
		/>
	);
};
