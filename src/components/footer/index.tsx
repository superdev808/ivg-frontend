'use client';

const Footer = () => {
	return (
		<>
			<div className={'grid bg-tranparent m-0 z-2 h-5rem'}>

				<div className="col-10 col-offset-1 md:col-4 md:col-offset-0 flex flex-column align-items-center">
					<p className="text-center md:text-left">© 2023 Ivory Guide, LLC and its subsidiaries. All rights reserved.</p>
				</div>
				<div className="col-10 col-offset-1 md:col-4 md:col-offset-4 flex flex-column align-items-center">
					<p className="text-center md:text-right">Report feedback/mistakes by emailing feedback@ivoryguide.com.</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
