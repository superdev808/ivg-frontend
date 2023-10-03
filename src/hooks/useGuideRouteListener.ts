import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { setSelectedGuide, setGuideData, reset, setSelectedStart } from '@/redux/features/guideSlice';
import { setSelectedCalculator, setCalculatorData, resetCalc, setSelectedCalStart } from '@/redux/features/calculatorSlice';

import {useGetGuidesQuery} from '@/redux/services/guidesApi';
import { useGetGuideNodesQuery } from '@/redux/services/guideNodesApi';
import { useGetGuideEdgesQuery } from '@/redux/services/guideEdgesApi';


import { useGetCalculatorsQuery } from '@/redux/services/calculatorsApi';
function useGuideRouteListener() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { isLoading:calcLoading , isFetching: calcFetching, data: calc, error: calcError } = useGetCalculatorsQuery(null);

  const { isLoading, isFetching, data: guides, error } = useGetGuidesQuery(null);
  const { isLoading:nodesIsLoading, isFetching: nodesIsFetching, data: nodes, error: nodesError } = useGetGuideNodesQuery(null);
  const { isLoading:edgesIsLoading, isFetching: edgesIsFetching, data: edges, error: edgesError } = useGetGuideEdgesQuery(null);
  useEffect(() => {
    const currentPath = pathname.split('/');
    if (currentPath.length > 1 && currentPath[1] == 'calculators') {
      if (calc && nodes && edges && calc.length > 0){
        const matchCalc = calc.find((calc) => Number(calc.id) === Number(currentPath[2]));
        const nodeData = nodes?.filter((node) => Number(node.guideId) === Number(matchCalc.id));
        const edgeData = edges?.filter((edge) =>  Number(edge.guideId) === Number(matchCalc.id));
        
        console.log({nodeData,edgeData});
        dispatch(setSelectedCalculator(matchCalc));
        dispatch(setCalculatorData({nodeData,edgeData})); 
      }

    } else {
      if (guides && nodes && edges) {

        dispatch(reset());
        const guideId = pathname.replaceAll('/', '');
        const guide = guides.find((guide) => Number(guide.id) === Number(guideId));
        const nodeData = nodes?.filter((node) => Number(node.guideId) === Number(guide.id));
        const edgeData = edges?.filter((edge) =>  Number(edge.guideId) === Number(guide.id));
        
        dispatch(setSelectedGuide(guide));
        dispatch(setGuideData({nodeData,edgeData})); 
      
    }

    }


  }, [pathname,calc, nodes, edges]);

  return null; // This hook doesn't return anything
}

export default useGuideRouteListener;