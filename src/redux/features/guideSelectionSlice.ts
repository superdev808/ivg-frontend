import { Edge, Guide, Node, PathIds } from '@/types/Guide';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GuideState = {
	selectedNodeData: Node[];
	selectedEdgeData: Edge[];
	selectedPathIds: PathIds[];
};

const initialState: GuideState = {
	selectedNodeData: [],
	selectedEdgeData: [],
	selectedPathIds: []
};

export const guideSlice = createSlice({
	name: 'guide',
	initialState,
	reducers: {
		reset: () => initialState,
		setSelectedData: (state, action) => {
			state.selectedNodeData = action.payload.nodes;
			state.selectedEdgeData = action.payload.edges;
		},
		setSelectedPathIds: (state, action) => {
			state.selectedPathIds = action.payload;
		}
	
	},
});

export const {
	reset,
	setSelectedData,
	setSelectedPathIds
} = guideSlice.actions;
export default guideSlice.reducer;

export const selectGuide = (state: any) => state.guide;
