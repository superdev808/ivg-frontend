import { Edge, Guide, Node } from '@/types/Guide';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GuideState = {
	selectedGuide: Guide | null;
	guideNodeData: Node[];
	guideEdgeData: Edge[];
};

const initialState: GuideState = {
	selectedGuide: null,
	guideNodeData: [],
	guideEdgeData: [],
	// selectedStart: null,
	// currentNode: null,
	// currentEdges: null,
	// currentPath: [],
};

export const guideSlice = createSlice({
	name: 'guide',
	initialState,
	reducers: {
		reset: () => initialState,

		setSelectedGuide: (state, action) => {
			state.selectedGuide = action.payload;
		},
		setGuideData: (state, action) => {
			state.guideNodeData = action.payload.nodeData;
			state.guideEdgeData = action.payload.edgeData;
		},
		// setGuideNodeData: (state, action) => {
		// 	state.guideNodeData = action.payload;
		// },
		// setGuideEdgeData: (state, action) => {
		// 	state.guideEdgeData = action.payload;
		// },
		// setSelectedStart: (state, action) => {
		// 	state.selectedStart = action.payload;
		// },
		// setCurrentNode: (state, action) => {
		// 	state.currentNode = action.payload;
		// },
		// setCurrentEdges: (state, action) => {
		// 	state.currentEdges = action.payload;
		// },
		// setCurrentPath: (state, action) => {
		// 	state.currentPath = action.payload;
		// },
	},
});

export const {
	reset,
	setSelectedGuide,
	setGuideData,
	// setGuideNodeData,
	// setGuideEdgeData,
	// setCurrentNode,
	// setSelectedStart,
	// setCurrentEdges,
	// setCurrentPath,
	// restart,
} = guideSlice.actions;
export default guideSlice.reducer;

export const selectGuide = (state: any) => state.guide;
