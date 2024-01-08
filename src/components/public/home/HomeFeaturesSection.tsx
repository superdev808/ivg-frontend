import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Image } from 'primereact/image';

const cx = classNames.bind(styles);

export const HomeFeaturesSection = () => {
	const features = [
		{
			title: 'WorkFlow',
			description: `Our guides can walk you through seemingly complicated processes & decisions and make you confident that you've chosen the right treatment
			plan every time.`,
			image: '/images/home/workflow.svg',
		},
		{
			title: 'Calculator',
			description: 'Utilize simple input-output guidance to help make decisions around topics like what materials to use and where to purchase them.',
			image: '/images/home/calculator.svg',
		},
	];
	const centerImage = '/images/home/display.png';

	return (
		<>
			<div className={cx(['public-content-container', 'section-container'])}>
				<div className="public-content-wrapper flex-column md:flex-row  justify-content-center">
					<div className={cx(['col-12 md:col-4 mb-4 flex flex-column align-items-center flex-order-1 md:flex-order-0'])}>
						<div className={cx(['public-blur-shadow'])}>
							<Image
								src={features[0].image}
								height="75px"
								alt={'workflow'}
							/>
						</div>
							<h2>{features[0].title}</h2>
						<span className={cx(['public-section-content'])}>{features[0].description}</span>
					</div>
					<div className={cx(['col-12 md:col-4 mb-4 align-self-center flex-order-0 md:flex-order-1'])}>
						<Image
							src={centerImage}
							alt="centerImage"
							width={'100%'}
							// height={'100%'}
						/>
					</div>
					<div className={cx(['col-12 md:col-4 mb-4 flex flex-column align-items-center flex-order-2'])}>
						<div className={cx(['public-blur-shadow'])}>
							<Image
								src={features[1].image}
								height="75px"
								alt={'workflow'}
							/>
						</div>
							<h2>{features[1].title}</h2>
						<span className={cx('public-section-content')}>{features[1].description}</span>
					</div>
				</div>
			</div>
		</>
	);
};
