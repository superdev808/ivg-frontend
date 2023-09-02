import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
// import { selectFlow, restart} from '@/redux/features/flowSlice';

export default function EditorHeader() {
	// const {selectedFlow, selectedFlowData} = useSelector(selectFlow);

	return (
		<>
			<div className="flex px-6  w-full justify-content-between align-content-center p-4">
				<div>
					<label className="text-2xl">test</label>
					<div className="divider-accent"></div>
				</div>

				<div className="align-self-center">
					<Button className="p-button">Save changes</Button>
				</div>
			</div>
		</>
	);
}
