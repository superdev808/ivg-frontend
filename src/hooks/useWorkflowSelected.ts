import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Node,Edge, Workflow } from '@/types/Workflow';

import { reset, setSelectedData, setSelectedPathIds, setLoading, setHeader } from '@/redux/features/workflowSelectionSlice';

import { selectWorkflows } from '@/redux/features/workflowsSlice';

import { nestNodesEdges } from '@/helpers/nestNodesEdges';
import { unpackNodesEdges } from '@/helpers/unpackNodesEdges';

function useWorkflowSelected() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  
  const {workflowsData, nodesData, edgesData, isLoading} = useSelector(selectWorkflows);
  const {selectedId} = useSelector(selectWorkflows);

  useEffect(() => {
    if (!isLoading) setLoading(true);
    if (workflowsData.length === 0 || nodesData.length === 0 || edgesData.length === 0) {
      return;
    }

    const currentPath = pathname.split('/');

    const selectedWorkflow = (workflowsData as Workflow[]).find((workflow) => Number(workflow.id) === Number(currentPath[currentPath.length - 2]));

    if (!selectedWorkflow) {
      dispatch(reset());
      return;
    }

    const filteredNodes = nodesData.filter((node: Node) => Number(node.flowId) === Number(selectedWorkflow.id));
    const filteredEdges = edgesData.filter((edge: Edge) =>  Number(edge.flowId) === Number(selectedWorkflow.id));
    
    const nodeCopy = JSON.parse(JSON.stringify(filteredNodes));
    const edgeCopy = JSON.parse(JSON.stringify(filteredEdges));
		const nestedNodes = nestNodesEdges(nodeCopy, edgeCopy);
    const {newNodes:nodes, newEdges:edges} = unpackNodesEdges(nestedNodes)

    dispatch(setHeader(selectedWorkflow.value))
    dispatch(setSelectedPathIds([[null, "0"]]))
    dispatch(setSelectedData({nodes, edges})); 
    if (isLoading) setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowsData, nodesData, edgesData]);

  return; 
}

export default useWorkflowSelected;