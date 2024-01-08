'use client';
import { useRef,useState  } from 'react';
import { useRouter } from 'next/navigation';
import { AutoComplete, AutoCompleteSelectEvent, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from 'primereact/autocomplete';

import { useGetWorkflowsQuery } from '@/redux/services/workflowsApi';

export default function SearchBar( {hideIcon=false}:{hideIcon?:boolean}) {
	const { isLoading, isFetching, data:workflows, error } = useGetWorkflowsQuery(null);

	const suggestions = [2, 117, 173];

	const [filterValue, setFilterValue] = useState<string>('');
	const [filteredWorkflows, setFilteredWorkflows] = useState<any>(workflows);

	const searchBar = useRef<AutoComplete>(null);
	const router = useRouter();

	
	const handleOnChange = (event: AutoCompleteChangeEvent) => {
		setFilterValue(event.target.value);
	};
	const handleOnFocus = () => {
		const filteredArray = workflows?.filter((el:any) => suggestions.includes(el.id));

		setFilteredWorkflows(filteredArray);
		
		if (searchBar.current) {
			searchBar.current.show();
		}
	};

	const handleCompleteMethod = (event: AutoCompleteCompleteEvent) => {
		setTimeout(() => {
			let filteredArray: any;
			if (!event.query.trim().length) {
				filteredArray = [...(workflows || [])];
			} else {
				filteredArray = workflows?.filter((el: { value: string }) => {
			
					return el.value.toString().toLowerCase().includes(event.query.toLowerCase());
				});
			}

			setFilteredWorkflows(filteredArray);
		}, 100);
	};
	const handleOnSelect= (event:AutoCompleteSelectEvent)=>{
		setFilterValue('');
		router.push('/'+event.value.id);
	}
    const suggestionTemplate = (suggestion:any) => {
		const suggestionText = suggestion.value;
		const lowerSuggestionText = suggestionText.toLowerCase();
		const lowerFilterValue = filterValue.toLowerCase();
		const startIndex = lowerSuggestionText.indexOf(lowerFilterValue);

		if (startIndex !== -1) {
			const beforeBold = suggestionText.substring(0, startIndex);
			const boldText = suggestionText.substring(startIndex, startIndex + filterValue.length);
			const afterBold = suggestionText.substring(startIndex + filterValue.length);
	
			const formattedString = (
				<span>
					{beforeBold}
					<span className="font-bold">{boldText}</span>
					{afterBold}
				</span>
			)
			
			return formattedString;
		}
	
		return suggestionText; 


  
    };

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
				aria-label="Workflows"
				dropdownAriaLabel="Search prompt"
				placeholder="Search..."
				className="w-full"
				inputClassName={'w-full p-inputtext-sm my-2 ' + (!hideIcon ? ' px-6' : ' px-3')}
				itemTemplate={suggestionTemplate}
				field="text_1"
				value={filterValue}
				suggestions={filteredWorkflows}
				completeMethod={(e) => handleCompleteMethod(e)}
				onClick={handleOnFocus}
				onSelect={handleOnSelect}
				onChange={(e) => handleOnChange(e)}

			/>
		</>
	);
}
