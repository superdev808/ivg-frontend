
import { useSelector, useDispatch } from 'react-redux';

import { selectFlow, restart} from '@/redux/features/flowSlice';



export default function GuideHeader() {
    const {selectedFlow, selectedFlowData} = useSelector(selectFlow);


	return (
		<>
			<div className="flex flex-column align-items-center  justify-content-center mb-4">
				<div className="flex my-3">
					<h1 className="text-black-700 my-0 ">{selectedFlow?.text_1}</h1>
			
				</div>
				<div className=" w-2">
					<div className="divider-accent"></div>
				</div>
			</div>
		</>
	);
}
