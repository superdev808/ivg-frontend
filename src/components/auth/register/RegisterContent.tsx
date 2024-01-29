import { Image } from 'primereact/image';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { RegisterFormComponent } from './RegisterForms';
import { Button } from 'primereact/button';
const cx = classNames.bind(styles);
export const RegisterContent = () => {
	return (
		<>
			<div className="h-screen">
				<div className=" grid h-full m-0">
					<div className={cx('container', 'col-5 bg-secondary relative')}>
						<div className={cx('radial-gradient')}></div>
						<div>
							<Link href="/">
								<Image
									src="/images/logo/Ivory-Guide-Horizontal-Logo-White.png"
									alt="Logo"
									width={'250'}
									className="relative mb-3"
								/>
							</Link>
						</div>
						<div
							className={cx('flex flex-column  justify-content-center')}
							style={{ height: '90%' }}>
							<div className={cx('title', 'text-7xl text-white font-bold text-center text-left line-height-2	')}>
								High Quality Patient Care At Your Fingertips
							</div>
							{/* <div className="text-xl text-white  text-left">High quality patient care starts here.</div>
							 */}
							<div>
								<Button
									icon="pi pi-play"
									label="Watch demo"
									outlined
									className="p-button-rounded p-button-lg text-white p-3"></Button>
							</div>
						</div>
					</div>
					<div className={cx('col-7 surface-200 grid flex-column m-0 p-0')}>
						<div className="col-12 flex-grow-1" style={{padding: '3rem 8rem  1rem 8rem'}}>
							<RegisterFormComponent />
                            
						</div>
               
						<div className="col-12 flex justify-content-center align-content-end">
							<span className="align-self-end">© 2023 Ivory Guide, LLC and its subsidiaries. All rights reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
