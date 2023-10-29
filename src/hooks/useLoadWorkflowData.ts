import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setWorkflowsData, reset } from '@/redux/features/workflowsSlice';

import { useGetWorkflowsQuery } from '@/redux/services/workflowsApi';
import { useGetWorkflowNodesQuery } from '@/redux/services/workflowNodesApi';
import { useGetWorkflowEdgesQuery } from '@/redux/services/workflowEdgesApi';

function useLoadWorkflowsData() {
	const dispatch = useDispatch();

	const { isLoading, isFetching, data: workflowsData, error } = useGetWorkflowsQuery(null);

	const { isLoading: nodesIsLoading, isFetching: nodesIsFetching, data: nodesData = [], error: nodesError } = useGetWorkflowNodesQuery(null);
	const { isLoading: edgesIsLoading, isFetching: edgesIsFetching, data: edgesData = [], error: edgesError } = useGetWorkflowEdgesQuery(null);
	useEffect(() => {
		if (workflowsData && nodesData && edgesData && !isLoading && !nodesIsLoading && !edgesIsLoading) {

			dispatch(setWorkflowsData({ workflowsData, nodesData, edgesData }));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflowsData, nodesData, edgesData, isLoading, nodesIsLoading, edgesIsLoading]);

	return;
}

export default useLoadWorkflowsData;
