import { useState, useEffect } from 'react';

// Custom hook to filter a list based on input text with debounce
function useFilteredList<T>(items: T[], searchKey: keyof T, delay: number = 200) {
	const [filteredList, setFilteredList] = useState<T[]>(items);
	const [input, setInput] = useState('');

	useEffect(() => {
		const handler = setTimeout(() => {
			const filtered = items.filter((item) => (item[searchKey] as String).toString().toLowerCase().includes(input.toLowerCase()));
			const sorted = filtered.sort((a, b) => {
				const aValue = (a[searchKey] as String).toString().toLowerCase();
				const bValue = (b[searchKey] as String).toString().toLowerCase();
				return aValue.localeCompare(bValue);
			});
			setFilteredList(sorted);
		}, delay);

		// Clear the timeout if the input changes
		return () => clearTimeout(handler);
	}, [input, items, searchKey, delay]);

	return {
		filteredList,
		input,
		setInput,
	};
}

export default useFilteredList;
