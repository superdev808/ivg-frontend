import { useSelector } from 'react-redux';

import { selectWorkflowSelection } from '@/redux/features/workflowSelectionSlice';
export default function WorkflowHeader() {
	const { selectedHeader } = useSelector(selectWorkflowSelection);

	return (
		<>
			<div className="flex flex-column  justify-content-center ">
				<div className="flex">
					<h1 className="text-black-700 my-0 mr-4">{selectedHeader}</h1>
					{/* <h1 className="text-black-700 my-0 mr-4">[Workflow Header]</h1> */}
				</div>

				<div className=" w-2 mt-3">
					<div className="divider-accent"></div>
				</div>
			</div>
		</>
	);
}
