// 'use client';

// import { useEffect,useState } from "react";
const devMode = process.env.NEXT_PUBLIC_DEV_MODE;

const Footer = () => {
	// const [dev, setDev] = useState('');
	console.log('devMode',devMode)
	
	// useEffect(() => {
	// 	console.log('devMode',process.env.DEV_MODE)
	// 	if(devMode) {
	// 		setDev('This is a development build.');
	// 	}
	// },[devMode]);


	return (
		<>
			<div className={'grid bg-tranparent m-0 z-2 h-5rem justify-content-center'}>
				<div className="col-10  md:col-4 flex flex-column align-items-center">
					<p className="text-center md:text-left">© 2023 Ivory Guide, LLC and its subsidiaries. All rights reserved.</p>
				</div >
				<div className="col-10  md:col-4 flex flex-column text-center">

					<p className="text-center">{devMode? <span className="text-red-700 border-1 border-red-700 border-round p-2 bg-red-100">This is a development build.</span> : ''}</p>

				</div>
			
				<div className="col-10  md:col-4 flex flex-column align-items-center">
					<p className="text-center md:text-right">Report feedback/mistakes by emailing feedback@ivoryguide.com.</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
