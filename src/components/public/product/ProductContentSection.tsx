import { Image } from 'primereact/image';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { ScrollCard } from '../shared/ScrollCard';
import { ColItemsSection } from '../shared/ColItemsSection';
import { CTASection } from '../shared/CTASection';
import Link from 'next/link';

const cx = classNames.bind(styles);

export const ProductContentSection = () => {

	// Advantage Section
	const advantageItems = [
		{
			title: 'Confirm Component Compatibility',
			description:
				"",
			image: '/images/product/compatibility.svg',
		},
		{
			title: 'Immediate Clinical Suggestions',
			description:
				'',
			image: '/images/product/suggestions.svg',
		},
		{
			title: 'On-Demand Procurement',
			description:
				'',
			image: '/images/product/procurement.svg',
		},
		{
			title: 'Simple Treatment Planninge',
			description:
				'',
			image: '/images/product/treatment.svg',
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
		<>
		{/* Product Section */}
		<div className={cx("section-container")}>
			<div className="flex flex-column align-items-center justify-content-center ">
				<div className={cx(['flex justify-content-center  relative w-full  p-4	 z-1'])} style={{maxWidth: '750px'}}>
					<Image
						className=""
						imageClassName="xl:absolute top-0 left-0 "
						src="/images/common/computer.png"
						alt="centerImage"
						width={'100%'}
					/>
				</div>
				<div className="w-full  px-2 xl:mb-6 grid justify-content-center relative z-2" style={{maxWidth: '1600px'}}>
					<div className="col-12 xl:col">
						<ScrollCard description="Automatically prompts users with necessary questions" />
					</div>
					<div className='xl:col-3'></div>
					<div className="col-12 xl:col">
						<ScrollCard
							description="Allows for planning of complicated treatment procedures with ease"
							rtl
						/>
					</div>
				</div>
				<div className="w-full px-2 grid justify-content-center relative  z-2" style={{maxWidth: '1400px'}}>
					<div className="col-12 xl:col">
						<ScrollCard description="Easy to navigate, interactive interface." />
					</div>
					<div className='xl:col-3'></div>
					<div className="col-12 xl:col">
						<ScrollCard
							description="Provides quick links to purchase necessary components"
							rtl
						/>
					</div>
				</div>
			</div>
		</div>
		{/* Advantage Section*/}
		<ColItemsSection reverse  items={advantageItems} title="Our Advantage" />


		{/* CTA Section */}
		<CTASection
			text={text}
			title={title}
		/>
		</>
	);
};
