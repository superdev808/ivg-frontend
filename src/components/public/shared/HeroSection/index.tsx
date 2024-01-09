import { useAppDispatch } from '@/redux/hooks';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

import classNames from 'classnames/bind';
import styles from './HeroSection.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

export const HeroSection = ({
	title,
	subtitle,
	cta,
	image
}: {
	title: React.JSX.Element | string;
	subtitle?: React.JSX.Element | string;
	cta: string;
	image: { src?: string;  width?: string, height?: string,offset?: boolean  };
}) => {
	const defaultImageAttr = { src: '', alt: 'hero-image', width: '100%', height: '100%', offset: false };
	const imageAttr = { ...defaultImageAttr, ...image };

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch({ type: 'ui/setTransparentNavBar', payload: true });

		return () => {
			dispatch({ type: 'ui/setTransparentNavBar', payload: false });
		};
	}, [dispatch]);
	
	const socialButtons = [
		{ icon: 'pi pi-facebook', ariaLabel: 'Facebook Link', link: '#' },
		{ icon: 'pi pi-instagram', ariaLabel: 'Instagram Link', link: '#' },
		{ icon: 'pi pi-linkedin', ariaLabel: 'LinkedIn Link', link: '#' },
	];

	return (
		<div className={cx(['top-offset-container', 'hero-container', 'px-3 md:px-6'])}>
			<div className={cx(['hero-wrapper', 'grid justify-content-between'])}>
				{/* Social Media Buttons */}

				<div className="col-1 md:col-2 flex flex-column justify-content-center">
					{socialButtons.map((button, index) => {
						return (
							<Button
								key={`social_${index}`}
								pt={{
									icon: { className: cx(['social-button']) },
								}}
								rounded
								outlined
								text
								icon={button.icon}
								className={cx(['text-white mt-5'])}
								aria-label={button.ariaLabel}
							/>
						);
					})}
				</div>
				<div className="col-10 md:col-5  flex flex-column justify-content-center align-items-end md:align-items-start ">
					<span className="text-primary text-2xl md:text-6xl font-bold text-right md:text-left">{title}</span>
					<span className="text-white text-lg md:text-xl text-right md:text-left">{subtitle}</span>
					<Button className={cx(['btn-primary', 'my-4 font-bold text-normal md:text-lg md:px-4 :md:py-3 '])}>{cta}</Button>
				</div>
				<div className="col-5 hidden md:flex">
					
						<div className={cx([{'hero-image-container': imageAttr.offset}, {'flex align-items-center justify-content-center w-full': !imageAttr.offset}])}>
							<Image
								src={imageAttr.src}
								width={imageAttr.width}
								alt="hero-image"
							/>
						</div>
					
					
				</div>
			</div>
		</div>
	);
};