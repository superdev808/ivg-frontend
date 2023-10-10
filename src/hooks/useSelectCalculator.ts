"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { setSelectedCalculator, setCalculatorData, resetCalc, setSelectedCalStart } from '@/redux/features/calculatorSlice';

import { useGetCalculatorsQuery } from '@/redux/services/calculatorsApi';
import { useGetCalcNodesQuery } from '@/redux/services/calcNodesApi';
import { useGetCalcEdgesQuery } from '@/redux/services/calcEdgesApi';
function useSelectCalculator() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { isLoading:calcLoading , isFetching: calcFetching, data: calc, error: calcError } = useGetCalculatorsQuery(null);
  const { isLoading:calcNodesLoading , isFetching: calcNodesFetching, data: calcNodes, error: calcNodesError } = useGetCalcNodesQuery(null);
  const { isLoading:calcEdgesLoading , isFetching: calcEdgesFetching, data: calcEdges, error: calcEdgesError } = useGetCalcEdgesQuery(null);
  
  useEffect(() => {
    if (
      calc && calcNodes && calcEdges && !calcLoading && !calcNodesLoading && !calcEdgesLoading
    ) {
    const currentPath = pathname.split('/');
 
    const matchCalc = calc.find((calc) => Number(calc.id) === Number(currentPath[2]));
    const nodeData = calcNodes?.filter((node) => Number(node.guideId) === Number(matchCalc.id));
    const edgeData = calcEdges?.filter((edge) =>  Number(edge.guideId) === Number(matchCalc.id));
    
    dispatch(setSelectedCalculator(matchCalc));
    dispatch(setCalculatorData({nodeData,edgeData})); 
  
    }

  }, [calc, calcNodes, calcEdges, calcLoading, calcNodesLoading, calcEdgesLoading]);

  return null; // This hook doesn't return anything
}

export default useSelectCalculator;