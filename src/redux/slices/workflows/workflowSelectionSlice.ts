import { Edge, Workflow, Node, PathIds } from '@/types/Workflow';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WorkflowState = {
	selectedId: string ;
	selectedHeader: String;
	selectedNodeData: Node[];
	selectedEdgeData: Edge[];
	selectedPathIds: PathIds[];
	isLoading: boolean;
};

const initialState: WorkflowState = {
	selectedId: '0',
	selectedHeader: '',
	selectedNodeData: [],
	selectedEdgeData: [],
	selectedPathIds: [],
	isLoading: true,
};

export const workflowSelectionSlice = createSlice({
	name: 'workflowSelection',
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
		setSelectedId: (state, action) => {
			state.selectedId = action.payload;
		}
	},
});

export const { reset, setSelectedData, setSelectedPathIds, setLoading, setHeader,setSelectedId } = workflowSelectionSlice.actions;
export default workflowSelectionSlice.reducer;

export const selectWorkflowSelection = (state: any) => state.workflowSelection;
