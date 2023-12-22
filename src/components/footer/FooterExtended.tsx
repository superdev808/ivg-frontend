// 'use client';

import { Button } from "primereact/button";
import { Image } from "primereact/image";
const cx = require('classnames/bind');
// import { useEffect,useState } from "react";
const devMode = process.env.NEXT_PUBLIC_DEV_MODE;

const FooterExtended = () => {


	return (
		<>
		<div className="w-full">
					<div
						className={cx(
							'col-10 col-offset-1 pb-4 flex flex-column md:flex-row align-items-center justify-content-between border-bottom-1'
						)}>
						<div className="w-12 md:w-3 text-center">
							<Image
								src="/Ivory-Guide-Logo-Stack.svg"
								alt="Ivory Guid Logo Stack"
								width="200"
								height={"100"}
								className="relative"
							/>
						</div>
						<div className={cx('blur-shadow', 'flex justify-content-center my-3 w-3 w-12 md:w-3')}>
							<Button
								pt={{
									icon: { style: { fontSize: '32px', color: 'var(--primary-dark-color)' } },
								}}
								rounded
								text
								icon="pi pi-facebook"
								className="mx-2"
								aria-label="Filter"
							/>
							<Button
								pt={{
									icon: { style: { fontSize: '32px', color: 'var(--primary-dark-color)' } },
								}}
								className="mx-2"
								icon="pi pi-instagram"
								rounded
								text
								aria-label="Filter"
							/>
							<Button
								pt={{
									icon: { style: { fontSize: '32px', color: 'var(--primary-dark-color)' } },
								}}
								className="mx-2"
								icon="pi pi-linkedin"
								rounded
								text
								aria-label="Filter"
							/>
						</div>
						<div className="w-12 md:w-3 flex justify-content-center">
							<Button
								outlined
								style={{ borderColor: 'var(--primary-dark-color)', color: 'var(--primary-dark-color)' }}
								className={cx('px-5 py-3 border-secondary')}>
								Contact Us
							</Button>
						</div>
					</div>
				</div>
		</>
	);
};

export default FooterExtended;
