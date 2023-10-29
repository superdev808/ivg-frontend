import { Edge, Workflow, Node } from '@/types/Workflow';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WorkflowState = {
	workflowsData: Workflow[];
	nodesData: Node[];
	edgesData: Edge[];
};

const initialState: WorkflowState = {
	workflowsData: [],
	nodesData: [],
	edgesData: []
};

export const workflowsSlice = createSlice({
	name: 'workflows',
	initialState,
	reducers: {
		reset: () => initialState,
		setWorkflowsData: (state, action) => {
			state.workflowsData = action.payload.workflowsData;
			state.nodesData = action.payload.nodesData;
			state.edgesData = action.payload.edgesData;
		},

	},
});

export const {
	reset,
	setWorkflowsData
} = workflowsSlice.actions;
export default workflowsSlice.reducer;

export const selectWorkflows = (state: any) => state.workflows;
