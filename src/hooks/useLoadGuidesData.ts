import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setGuidesData, reset } from '@/redux/features/guidesSlice';

import { useGetGuidesQuery } from '@/redux/services/guidesApi';
import { useGetGuideNodesQuery } from '@/redux/services/guideNodesApi';
import { useGetGuideEdgesQuery } from '@/redux/services/guideEdgesApi';

function useLoadGuidesData() {
	const dispatch = useDispatch();

	const { isLoading, isFetching, data: guidesData, error } = useGetGuidesQuery(null);

	const { isLoading: nodesIsLoading, isFetching: nodesIsFetching, data: nodesData = [], error: nodesError } = useGetGuideNodesQuery(null);
	const { isLoading: edgesIsLoading, isFetching: edgesIsFetching, data: edgesData = [], error: edgesError } = useGetGuideEdgesQuery(null);
	useEffect(() => {
		if (guidesData && nodesData && edgesData && !isLoading && !nodesIsLoading && !edgesIsLoading) {

			dispatch(setGuidesData({ guidesData, nodesData, edgesData }));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [guidesData, nodesData, edgesData, isLoading, nodesIsLoading, edgesIsLoading]);

	return;
}

export default useLoadGuidesData;
