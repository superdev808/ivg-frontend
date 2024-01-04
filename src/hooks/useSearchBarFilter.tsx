import { useState, useEffect } from 'react';

export default function useSearchBarFilter(initialDataPromise: any, suggestions:any)  {
	const [array, setArray] = useState<any[]>([]);
	const [filterValue, setFilterValue] = useState<string>('');
	const [filteredArray, setFilteredArray] = useState<any[]>([]);

	useEffect(() => {
		setArray(initialDataPromise);
		setFilteredArray(initialDataPromise);
	}, [initialDataPromise]);

	const filterSuggestions = () => {

		// let _filteredArray = array.filter(item => suggestions.includes(item.id));
  
		// setFilteredArray(_filteredArray);
	};

	const handleInputChange = (event: any) => {
		setFilterValue(event.target.value);
	};

	const searchValue = (event: { query: string }) => {
		setTimeout(() => {
			let _filteredArray;
			if (!event.query.trim().length) {
				_filteredArray = [...array];
			} else {
				_filteredArray = array.filter((item: { text_1: string; id: string }) => {
					return item.text_1.toLowerCase().includes(event.query.toLowerCase());
				});
			}

			setFilteredArray(_filteredArray);
		}, 100);
	};
	return {
		filteredArray,
		filterSuggestions,
		filterValue,
		handleInputChange,
		searchValue,
	};
};

