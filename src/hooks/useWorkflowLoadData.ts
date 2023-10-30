import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';
import { setWorkflowsData, setMenuItems, setMenuQuestions } from '@/redux/features/workflowsSlice';

import { useGetWorkflowsQuery } from '@/redux/services/workflowsApi';
import { useGetWorkflowNodesQuery } from '@/redux/services/workflowNodesApi';
import { useGetWorkflowEdgesQuery } from '@/redux/services/workflowEdgesApi';
import { useGetWorkflowMenuItemsQuery } from '@/redux/services/workflowsMenuItemsApi';
import { useGetWorkflowMenuQuestionsQuery } from '@/redux/services/workflowsMenuQuestionsApi';

function useWorkflowLoadData() {
	const dispatch = useAppDispatch();

	const { isLoading: itemsLoading, data: itemsData = [], error: itemsError } = useGetWorkflowMenuItemsQuery(null);
	const { isLoading: questionsLoading, data: questionsData = [], error: questionsError } = useGetWorkflowMenuQuestionsQuery(null);

	const { isLoading, isFetching, data: workflowsData, error } = useGetWorkflowsQuery(null);

	const { isLoading: nodesIsLoading, isFetching: nodesIsFetching, data: nodesData = [], error: nodesError } = useGetWorkflowNodesQuery(null);
	const { isLoading: edgesIsLoading, isFetching: edgesIsFetching, data: edgesData = [], error: edgesError } = useGetWorkflowEdgesQuery(null);
	useEffect(() => {
		if (workflowsData && nodesData && edgesData && !isLoading && !nodesIsLoading && !edgesIsLoading) {
			dispatch(setWorkflowsData({ workflowsData, nodesData, edgesData }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflowsData, nodesData, edgesData, isLoading, nodesIsLoading, edgesIsLoading]);

	useEffect(() => {
		if (questionsData) {
			dispatch(setMenuQuestions(questionsData));
		}
	}, [questionsData && !questionsLoading]); // eslint-disable-line react-hooks/exhaustive-deps
	
	useEffect(() => {
		if (itemsData) {
			dispatch(setMenuItems(itemsData));
		}
	}, [itemsData && !itemsLoading]); // eslint-disable-line react-hooks/exhaustive-deps
	return;
}

export default useWorkflowLoadData;
