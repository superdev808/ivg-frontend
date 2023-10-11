import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Node,Edge, Guide } from '@/types/Guide';

import { reset, setSelectedData } from '@/redux/features/guideSelectionSlice';

import { selectGuides } from '@/redux/features/guidesSlice';
import useLoadGuidesData from './useLoadGuidesData';



function useSelectGuide() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  useLoadGuidesData();
  
  const {guidesData, nodesData, edgesData} = useSelector(selectGuides);

  useEffect(() => {
    if (guidesData.length === 0 || nodesData.length === 0 || edgesData.length === 0) {
      return;
    }

    const currentPath = pathname.split('/');
    const selectedGuide = (guidesData as Guide[]).find((guide) => Number(guide.id) === Number(currentPath[2]));

    if (!selectedGuide) {
      dispatch(reset());
      return;
    }

    const nodes = nodesData.filter((node: Node) => Number(node.guideId) === Number(selectedGuide.id));
    const edges = edgesData.filter((edge: Edge) =>  Number(edge.guideId) === Number(selectedGuide.id));
    
    dispatch(setSelectedData({nodes,edges})); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guidesData, nodesData, edgesData]);

  return; 
}

export default useSelectGuide;