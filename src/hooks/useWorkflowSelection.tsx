import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetWorkflowMenuItemsQuery } from '@/redux/slices/api/workflowsMenuItemsApi';
import { useGetWorkflowMenuQuestionsQuery } from '@/redux/slices/api/workflowsMenuQuestionsApi';

type MenuItem = {
	id: number;
	value: string;
	hierarchy: string[];
	description?: string;
};

function useWorkflowSelection(params: string[]) {
	const {  data: itemsData = [], error: itemsError } = useGetWorkflowMenuItemsQuery(null);
	const {  data: questionsData = [], error: questionsError } = useGetWorkflowMenuQuestionsQuery(null);

	const router = useRouter();
	
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [currentItems, setCurrentItems] = useState<MenuItem[]>([]);
	const [currentQuestion, setCurrentQuestion] = useState<MenuItem | null>(null);
	const [breadcrumbs, setBreadcrumbs] = useState<{value:string, path:string}[]>([]);
	const [isFlow, setIsFlow] = useState<boolean>(false);
	

	function filterCurrentSelections(ids: string[]) {
		return itemsData.filter((item) => String(item.hierarchy) == String(ids));
	}
	function filterCurrentQuestions(ids: string[]) {
		return questionsData.filter((item) => String(item.hierarchy) == String(ids));
	}

	useEffect(() => {
		if (itemsData.length == 0 || questionsData.length == 0) return
		let mappedBreadcrumbs:{value:string, path:string}[] = [];
		if (params) {
			mappedBreadcrumbs = params.map((id) => {
				const item = itemsData.find((item) => String(item.id) == String(id));
				return item ? { value: item.value, path: '/workflows/' + item.hierarchy.join('/') } : { value: '', path: '' };
	
			});

		}
		
		let currentItems = filterCurrentSelections(params);
		let currentQuestion = filterCurrentQuestions(params);
	
		if (currentItems.length == 0) {
			currentItems = filterCurrentSelections([] as string[]);
			currentQuestion = filterCurrentQuestions([] as string[]);
			// router.push('/workflows', { scroll: false });
		}
	
		setBreadcrumbs(mappedBreadcrumbs);
		setCurrentQuestion(currentQuestion[0]);
		setCurrentItems(currentItems);
		setIsLoading(false);
	}, [params]);

	return { currentItems, currentQuestion,breadcrumbs, isLoading };
}

export default useWorkflowSelection;
