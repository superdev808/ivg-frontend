import classNames from 'classnames/bind';
import styles from './ThreeColSection.module.scss';
import { Image } from 'primereact/image';

const cx = classNames.bind(styles);

type ThreeColSectionProps = {
	title: string;
	items: {
		title: string;
		description: string;
		image: string;
	}[];
	reverse?: boolean;
};

export const ThreeColSection = ({ title, items, reverse }: ThreeColSectionProps) => {
	return (
		<div className={cx('public-content-container', 'three-col-container')}>
			<div className={cx('public-content-wrapper flex-column my-6 align-items-center justify-content-center ')}>
				<span className={cx('my-4 public-section-title ')}>{title}</span>

				<div className="grid mx-0 px-0 justify-content-center">
					{items &&
						items.map((item, index) => {
							return (
								<div
									key={`item_${index}`}
									className={cx(['three-col-item', 'col-12 md:col-4  flex flex-column align-items-center text-center '])}>
									<h2 className={cx({'flex-order-1': reverse })}>{item.title}</h2>
									<div className={cx(['public-blur-shadow',{'flex-order-0': reverse}])}>
										<Image
											src={item.image}
											height="110px"
											alt={item.title}
										/>
									</div>
									<span className={cx('mt-6 public-section-content-xl')}>{item.description}</span>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};
