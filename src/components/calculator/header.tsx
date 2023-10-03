
import { useSelector } from 'react-redux';

import { selectCalculator } from '@/redux/features/calculatorSlice';
import { Skeleton } from 'primereact/skeleton';
export default function CalculatorHeader() {
    const {selectedCalculator, calculatorNodeData} = useSelector(selectCalculator);


	return (
		<>
			<div className="flex flex-column  justify-content-center mb-4">
					<div className='flex'>

					{!calculatorNodeData ? 
					(<Skeleton width="50%" height='2.5rem' ></Skeleton>) 
					: 
					(<h1 className="text-black-700 my-0 mr-4">{selectedCalculator?.value}</h1>)}
	

					</div>

			
				<div className=" w-2 my-2">
					<div className="divider-accent"></div>
				</div>
			</div>
		</>
	);
}
