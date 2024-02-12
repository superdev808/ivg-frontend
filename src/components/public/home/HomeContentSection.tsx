import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Image } from 'primereact/image';
import Link from 'next/link';

import { ColItemsSection } from '../shared/ColItemsSection';
import { CTASection } from '../shared/CTASection';

const cx = classNames.bind(styles);

export const HomeContentSection = () => {
	const advantageItems = [
		{
			title: 'Reduce Additional Appointments',
			description: '',
			image: '/images/home/advantage_appointments.svg',
		},
		{
			title: 'Feel Confident With Every Procedure',
			description: '',
			image: '/images/home/advantage_procedure.svg',
		},
		{
			title: 'Empower Customer Support Teams',
			description: '',
			image: '/images/home/advantage_support.svg',
		},
	];
	const helpItems = [
		{
			title: 'Dental Practices',
			description: ['Plan complicated procedures', 'Choose restoration materials', 'Troubleshoot chairside cases'],
			image: '/images/home/practices.svg',
		},
		{
			title: 'Dental Labs',
			description: ['Empower Customer Service teams', 'Reduce escalations to technicians'],
			image: '/images/home/laboratories.svg',
		},
		{
			title: 'Dental Schools',
			description: ['Access up-to-date, research supported recommendations', 'Useful for future dentists, assistants, and technicians'],
			image: '/images/home/schools.svg',
		},
	];
	const title: string = 'Media/Partnership Inquiries';
	const text: JSX.Element = (
		<>
			Interested in collaborating with Ivory Guide? Contact us by emailing&nbsp;
			<Link href="mailto:support@ivoryguide.com">
				<span className="font-bold text-white underline">support@ivoryguide.com</span>
			</Link>
		</>
	);

	return (
		<>
			<div className={cx(['section-container', 'relative overflow-hidden'])}>
				<div
					className={cx('background-radial-gradient', 'hidden lg:block')}
					style={{ top: '-400px', left: '-300px', width: '800px', height: '800px' }}></div>
				<div
					className={cx('background-radial-gradient', 'hidden lg:block')}
					style={{ top: '400px', right: '-300px', width: '800px', height: '800px' }}></div>

				<div className="flex flex-column align-items-center  justify-content-center text-center mt-8">
					<span className={cx(['col-12 md:col-8', 'public-section-title', 'my-2'])}>Our Platform</span>
					<span className={cx(['col-12 md:col-8', 'public-section-content-2xl', 'text-center'])}>
						Evidence based dental guidance, for all industry professionals.
					</span>
				</div>
				<div className="flex flex-column md:flex-row align-items-center justify-content-center my-6">
					<div className={cx(['flex justify-content-center w-full relative  p-2	'])}>
						<Image
							src="/images/common/computer.png"
							alt="centerImage"
							width={'100%'}
						/>
						<div
							className="w-8 absolute flex justify-content-center align-content-center"
							style={{ top: '40%', transform: 'translateY(-40%)' }}>
							<Image
								className=" "
								src="/images/home/image_01.png"
								alt="centerImage"
								width={'100%'}
							/>
						</div>
					</div>
				</div>

				<div className="p-2 md:p-4 border-round  relative ">
					<ColItemsSection
						reverse
						items={advantageItems}
						title="Our Advantage"
						dark
					/>
				</div>

				<div className={cx('flex flex-column md:py-6  align-items-center justify-content-center surface-100 ')}>
					<span className={cx('mt-4  public-section-title ')}>Who We Help</span>
					<span className={cx('mb-8 text-center my-4 public-section-content-2xl')}>We are a FREE resource for all dental professionals.</span>
					<div className="grid mx-0 px-0 justify-content-center">
						{helpItems &&
							helpItems.map((item, index) => {
								return (
									<div
										key={`item_${index}`}
										className={cx(['three-col-item', 'col-12 md:col-4  flex flex-column align-items-center text-center '])}>
										<div className="flex mb-4 justify-content-center">
											<div className={cx(['relative w-3 lg:w-4'])}>
												<div className={cx('public-blur-shadow', 'absolute')}></div>

												<Image
													src={item.image}
													width="100%"
													alt={item.title}
												/>
											</div>
											<span className={cx('public-section-label align-self-center px-4')}>{item.title}</span>
										</div>

										{item.description.map((item, index) => {
											return (
												<div
													key={`r_${index}`}
													className={cx('flex mb-3 w-full px-2 public-section-content-xl justify-content-center')}>
													<span className=" align-self-center mr-3 ">
														<i className={cx('pi pi-check')} />
													</span>
													<span className="text-left">{item}</span>
												</div>
											);
										})}
									</div>
								);
							})}
					</div>
				</div>
				<CTASection
					text={text}
					title={title}
				/>
			</div>
		</>
	);
};
