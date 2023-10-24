import { useSelector } from 'react-redux';

import { selectGuide } from '@/redux/features/guideSelectionSlice';
export default function GuideHeader() {
	const { selectedHeader } = useSelector(selectGuide);

	return (
		<>
			<div className="flex flex-column  justify-content-center ">
				<div className="flex">
					<h1 className="text-black-700 my-0 mr-4">{selectedHeader}</h1>
					{/* <h1 className="text-black-700 my-0 mr-4">[Guide Header]</h1> */}
				</div>

				<div className=" w-2 mt-3">
					<div className="divider-accent"></div>
				</div>
			</div>
		</>
	);
}
