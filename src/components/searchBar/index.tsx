'use client';
import { useRef,useState  } from 'react';
import { useRouter } from 'next/navigation';
import { AutoComplete, AutoCompleteSelectEvent, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from 'primereact/autocomplete';

import { useGetFlowsQuery } from '@/redux/services/flowApi';
import { reset, restart } from '@/redux/features/flowSlice';
import { useDispatch } from 'react-redux';
export default function SearchBar( {hideIcon=false}:{hideIcon?:boolean}) {


	const { isLoading, isFetching, data: flows, error } = useGetFlowsQuery(null);
	const _suggestions = [4, 236, 114];

	const [filterValue, setFilterValue] = useState<string>('');
	const [filteredFlows, setFilteredFlows] = useState<any>(flows);

	const searchBar = useRef<AutoComplete>(null);
	const router = useRouter();
	const dispatch = useDispatch();

	
	const handleOnChange = (event: AutoCompleteChangeEvent) => {
		setFilterValue(event.target.value);
	};
	const handleOnFocus = () => {
		let _filteredArray = flows?.filter(el => _suggestions.includes(el.id));

		setFilteredFlows(_filteredArray);
		
		if (searchBar.current) {
			searchBar.current.show();
		}
	};

	const handleCompleteMethod = (event: AutoCompleteCompleteEvent) => {
		setTimeout(() => {
			let _filteredArray: any;
			if (!event.query.trim().length) {
				_filteredArray = [...(flows || [])];
			} else {
				_filteredArray = flows?.filter((el: { text_1: string }) => {
			
					return el.text_1.toString().toLowerCase().includes(event.query.toLowerCase());
				});
			}

			setFilteredFlows(_filteredArray);
		}, 100);
	};
	const handleOnSelect= (event:AutoCompleteSelectEvent)=>{
		setFilterValue('');
		router.push('/'+event.value.id);
	}



	return (
		<>
			{!hideIcon ? (
				<i
					style={{ zIndex: 2, margin: '18px' }}
					className="pi pi-search absolute"></i>
			) : (
				<></>
			)}

			<AutoComplete
				ref={searchBar}
				aria-label="Prompts"
				dropdownAriaLabel="Search prompt"
				placeholder="Search..."
				className="w-full"
				inputClassName={'w-full p-inputtext-sm my-2 ' + (!hideIcon ? ' px-6' : ' px-3')}
				field="text_1"
				value={filterValue}
				suggestions={filteredFlows}
				completeMethod={(e) => handleCompleteMethod(e)}
				onClick={handleOnFocus}
				onSelect={handleOnSelect}
				onChange={(e) => handleOnChange(e)}

			/>
		</>
	);
}
