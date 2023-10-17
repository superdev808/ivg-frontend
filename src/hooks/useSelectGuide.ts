import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Node,Edge, Guide } from '@/types/Guide';

import { reset, setSelectedData, setSelectedPathIds } from '@/redux/features/guideSelectionSlice';

import { selectGuides } from '@/redux/features/guidesSlice';
import useLoadGuidesData from './useLoadGuidesData';

import { nestNodesEdges } from '@/helpers/nestNodesEdges';
import { unpackNodesEdges } from '@/helpers/unpackNodesEdges';

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

    const filteredNodes = nodesData.filter((node: Node) => Number(node.guideId) === Number(selectedGuide.id));
    const filteredEdges = edgesData.filter((edge: Edge) =>  Number(edge.guideId) === Number(selectedGuide.id));
    
    const nodeCopy = JSON.parse(JSON.stringify(filteredNodes));
    const edgeCopy = JSON.parse(JSON.stringify(filteredEdges));
		const nestedNodes = nestNodesEdges(nodeCopy, edgeCopy);
    const {newNodes:nodes, newEdges:edges} = unpackNodesEdges(nestedNodes)

    dispatch(setSelectedPathIds([[null, "0"]]))
    dispatch(setSelectedData({nodes, edges})); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guidesData, nodesData, edgesData]);

  return; 
}

export default useSelectGuide;