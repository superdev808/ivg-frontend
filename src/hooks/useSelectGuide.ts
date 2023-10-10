import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { setSelectedGuide, setGuideData, reset } from '@/redux/features/guideSlice';

import {useGetGuidesQuery} from '@/redux/services/guidesApi';
import { useGetGuideNodesQuery } from '@/redux/services/guideNodesApi';
import { useGetGuideEdgesQuery } from '@/redux/services/guideEdgesApi';


import { Guide } from '@/types/Guide';
function useSelectGuide() {
  const dispatch = useDispatch();
  const pathname = usePathname();


  const { isLoading, isFetching, data: guides, error } = useGetGuidesQuery(null);

  const { isLoading:nodesIsLoading, isFetching: nodesIsFetching, data: nodes = [], error: nodesError } = useGetGuideNodesQuery(null);
  const { isLoading:edgesIsLoading, isFetching: edgesIsFetching, data: edges = [], error: edgesError } = useGetGuideEdgesQuery(null);
  useEffect(() => {
    if (
      guides && nodes && edges && !isLoading && !nodesIsLoading && !edgesIsLoading
    ) {
    const currentPath = pathname.split('/');
 
    const matchGuide = (guides as Guide[]).find((guide) => Number(guide.id) === Number(currentPath[2]));

    
    if (!matchGuide) {
      dispatch(reset());
      return;
    }

    const nodeData = nodes.filter((node) => Number(node.guideId) === Number(matchGuide.id));
    const edgeData = edges.filter((edge) =>  Number(edge.guideId) === Number(matchGuide.id));
    
    dispatch(setSelectedGuide(matchGuide));
    dispatch(setGuideData({nodeData,edgeData})); 
  
    }

  }, [guides, nodes, edges, isLoading, nodesIsLoading, edgesIsLoading]);

  return; 
}

export default useSelectGuide;