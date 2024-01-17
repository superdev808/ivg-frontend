// import { ThreeColSection } from '../shared/ColItemsSection';

import { CTASection } from '../shared/CTASection';
import { ColItemsSection } from '../shared/ColItemsSection';
import Link from 'next/link';

export const AboutContentSection = () => {
	// Advantage Section
	const advantageItems = [
		{
			title: 'Fractured clinical knowledge',
			description: 'Dentists lack access rely on knowledge learned years or decades ago to solve chairside problems.',
			image: '/images/about/advantage_fracture.svg',
		},
		{
			title: 'Inconsistent Patient Care',
			description: 'Patients are often sent home with unfinished treatments due to lack of support.',
			image: '/images/about/advantage_inconsistent.svg',
		},
		{
			title: 'Overwhelmed support staff',
			description: 'Customer service staff lack training to answer complicated dental questions.',
			image: '/images/about/advantage_overwhelmed.svg',
		},
	];

	// CTA Section
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
		<div className="pt-8">
			<ColItemsSection
				items={advantageItems}
				title="Let’s address the elephant in the room"
				subtitle="The dental industry today lacks real-time support for doctors and training for support staff to solve problems efficiently."
			/>

			<CTASection
				text={text}
				title={title}
			/>
		</div>
	);
};
