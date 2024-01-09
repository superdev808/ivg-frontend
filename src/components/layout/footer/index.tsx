const cx = require('classnames/bind');
const devMode = process.env.NEXT_PUBLIC_DEV_MODE;

const Footer = () => {
	return (
		<div className={cx(['px-3 md:px-6',"flex"])}>
			<div className={'grid bg-tranparent m-0 z-2 h-5rem w-full'}>
				<div className="col-12  md:col-4 flex flex-column align-items-center">
					<p className="text-center md:text-left">© 2023 Ivory Guide, LLC and its subsidiaries. All rights reserved.</p>
				</div >
				<div className="col-12  md:col-4 flex flex-column text-center">

					<p className="text-center">{devMode? <span className="text-red-700 border-1 border-red-700 border-round p-2 bg-red-100">This is a development build.</span> : ''}</p>

				</div>
			
				<div className="col-12  md:col-4 flex flex-column align-items-center">
					<p className="text-center md:text-right">Report feedback/mistakes by emailing feedback@ivoryguide.com.</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;