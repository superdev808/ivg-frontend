import { Image } from 'primereact/image';

import classNames from 'classnames/bind';
import styles from './Calculators.module.scss';

const cx = classNames.bind(styles);

export const CalculatorsHowSection = () => {
	const title = 'How it Works';
	const leftContent = [
		'Practitioners and Customer Service teams can search our ever-growing database for frequently asked questions and topics.',
		'Our calculators work by prompting the user to answer all relevant questions & searching our database to calculate the correct answer.',
	];

	const rightContent = ['Restoration material selection', 'All-On-X implant guidance', 'Scanbody selection'];

	return (
		<>
			<div className={cx(['public-content-container', 'section-container'])}>
				<div className="public-content-wrapper flex-column  align-content-center">
					<div className="text-center">
						<div className="text-4xl md:text-6xl font-bold">{title}</div>
					</div>
					<div className={cx(['grid mx-0 px-0 justify-content-center align-items-center'])}>
						<div className={cx(['public-blur-shadow', 'col-12 md:col-4 my-6 p-0 md:p-4 '])}>
							{leftContent.map((item, index) => {
								return <p className='public-section-content text-left font-bold' key={`l_${index}`}>{item}</p>;
							})}
						</div>
						<div className={cx(['col-12 md:col-4 px-0 md:px-4 text-center '])}>
							<Image
								src={'/images/calculators/product/bogdan.jpg'}
								alt="centerImage"
								width={'100%'}
								height={'100%'}
								imageStyle={{maxWidth:'400px', minWidth:'100px'}}
							/>
						</div>
						<div className={cx(['public-blur-shadow', 'col-12 md:col-4 p-0 md:p-4 flex flex-column my-6'])}>
							{rightContent.map((item, index) => {
								return (
									<div
										key={`r_${index}`}
										className={cx('grid my-3 ')}>
										<span className="col-2 md:col-1 pr-2">
											<i className={cx('pi pi-check')} />
										</span>
										<span className="col-10 md:col-11 public-section-content font-bold text-left ">{item}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
