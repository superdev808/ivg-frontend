import { Edge, Workflow, Node, PathIds } from '@/types/Workflow';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WorkflowState = {
	selectedHeader: String;
	selectedNodeData: Node[];
	selectedEdgeData: Edge[];
	selectedPathIds: PathIds[];
	isLoading: boolean;
};

const initialState: WorkflowState = {
	selectedHeader: '',
	selectedNodeData: [],
	selectedEdgeData: [],
	selectedPathIds: [],
	isLoading: false,
};

export const workflowSlice = createSlice({
	name: 'workflow',
	initialState,
	reducers: {
		reset: () => initialState,
		setHeader: (state, action: PayloadAction<String>) => {
			state.selectedHeader = action.payload;

		},
		setSelectedData: (state, action) => {
			state.selectedNodeData = action.payload.nodes;
			state.selectedEdgeData = action.payload.edges;
		},
		setSelectedPathIds: (state, action) => {
			state.selectedPathIds = action.payload;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { reset, setSelectedData, setSelectedPathIds, setLoading, setHeader } = workflowSlice.actions;
export default workflowSlice.reducer;

export const selectWorkflow = (state: any) => state.workflow;
