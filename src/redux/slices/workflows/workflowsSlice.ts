import { Edge, Workflow, Node } from '@/types/Workflow';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WorkflowState = {
	workflowsData: Workflow[];
	nodesData: Node[];
	edgesData: Edge[];
	menuItems: any[];
	menuQuestions: any[];
};

const initialState: WorkflowState = {
	workflowsData: [],
	nodesData: [],
	edgesData: [],
	menuItems:[],
	menuQuestions:[]
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
		setMenuItems: (state, action) => {
			state.menuItems = action.payload;
		},
		setMenuQuestions: (state, action) => {
			state.menuQuestions = action.payload;
		},

	},
});

export const {
	reset,
	setWorkflowsData,
	setMenuItems,
	setMenuQuestions
} = workflowsSlice.actions;
export default workflowsSlice.reducer;

export const selectWorkflows = (state: any) => state.workflows;
