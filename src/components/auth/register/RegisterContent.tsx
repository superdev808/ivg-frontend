import { Image } from 'primereact/image';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { RegisterFormComponent } from './RegisterForms';
import { Button } from 'primereact/button';
const cx = classNames.bind(styles);
export const RegisterContent = () => {
	return (
		<div className="grid  h-full m-0 p-0">
			<div className="col-12 m-0 p-0 md:col-5   sm:px-2 md:px-4 lg:px-6 xl:px-8 grid bg-secondary ">
				<div className={cx('radial-gradient', 'hidden lg:block')}></div>
				<div className="col-12 flex align-items-center md:align-items-start justify-content-center md:justify-content-start">
					<Link href="/">
						<Image
							src="/images/logo/Ivory-Guide-Horizontal-Logo-White.png"
							alt="Logo"
							width={'250'}
							className="relative mb-3"
						/>
					</Link>
				</div>

				<div className="col-12 flex align-items-center md:align-items-start justify-content-center md:justify-content-start">
					<span className={cx('text-2xl lg:text-7xl md:text-5xl text-white font-bold text-center md:text-left line-height-2')}>
						High Quality Patient Care At Your Fingertips
					</span>
				</div>

				{/* <Button
									icon="pi pi-play"
									label="Watch demo"
									outlined
									className="p-button-rounded p-button-lg text-white p-3"
								></Button> */}
				{/* </div> */}
			</div>
			<div className={cx('col-12 md:col-7 surface-200 m-0 p-0 h-screen relative overflow-hidden overflow-y-auto justify-content-end')}>
				<RegisterFormComponent />
			</div>
		</div>
	);
};
