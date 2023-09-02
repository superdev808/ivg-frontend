import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { setSelectedGuide, setGuideData, reset, setSelectedStart } from '@/redux/features/guideSlice';

import {useGetGuidesQuery} from '@/redux/services/guidesApi';
import { useGetGuideNodesQuery } from '@/redux/services/guideNodesApi';
import { useGetGuideEdgesQuery } from '@/redux/services/guideEdgesApi';
import { Flow } from '@/types/flow';
function useGuideRouteListener() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { isLoading, isFetching, data: guides, error } = useGetGuidesQuery(null);
  const { isLoading:nodesIsLoading, isFetching: nodesIsFetching, data: nodes, error: nodesError } = useGetGuideNodesQuery(null);
  const { isLoading:edgesIsLoading, isFetching: edgesIsFetching, data: edges, error: edgesError } = useGetGuideEdgesQuery(null);
  useEffect(() => {
    if (guides && nodes && edges) {
        dispatch(reset());
        const guideId = pathname.replaceAll('/', '');
        const guide = guides.find((guide) => Number(guide.id) === Number(guideId));
        const nodeData = nodes?.filter((node) => Number(node.guideId) === Number(guide.id));
        const edgeData = edges?.filter((edge) =>  Number(edge.guideId) === Number(guide.id));
 
        dispatch(setSelectedGuide(guide));
        dispatch(setGuideData({nodeData,edgeData})); 
    }

  }, [pathname,guides, nodes, edges]);

  return null; // This hook doesn't return anything
}

export default useGuideRouteListener;