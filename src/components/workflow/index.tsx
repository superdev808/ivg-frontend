'use client';
import { use, useEffect, useState } from 'react';
import WorkflowSelectionMenuComponent from './SelectionMenu';

import WorkflowComponent from './Workflow';
import useWorkflowLoadData from '@/hooks/useWorkflowLoadData';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import { setSelectedId } from '@/redux/features/workflowSelectionSlice';

const WorkflowsComponent = (params: { flowIds: string[] }) => {
	const dispatch = useDispatch();
	useWorkflowLoadData();

	const { menuItems, menuQuestions } = useAppSelector((state) => state.workflows);
	const { selectedId } = useAppSelector((state) => state.workflowSelection);

	const [renderComponent, setRenderComponent] = useState<any>(null);

	useEffect(() => {
		if (menuItems.length == 0 || menuQuestions.length == 0) return;

		if (!params.flowIds) return;

		const currentSelection = params.flowIds[params.flowIds.length - 1];
		const flow = menuItems.find(
			(item) => String(currentSelection) == String(item.id) && String(item.hierarchy) == String(params.flowIds.slice(0, -1)) && item.flow
		);
		if (flow) {
			dispatch(setSelectedId(flow.id));
		} else {
			dispatch(setSelectedId(0));
		}
	}, [menuItems, menuQuestions]);


	useEffect(() => {
		if (Number(selectedId)  > 0) {
			setRenderComponent(<WorkflowComponent />);
		} else if (Number(selectedId) === 0) {
			
			setRenderComponent(<WorkflowSelectionMenuComponent flowIds={params.flowIds} />);
		}

	}, [selectedId]);


	return renderComponent;
};

export default WorkflowsComponent;
