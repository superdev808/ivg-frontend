import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flow } from '@/types/flow';

const initialState: any = {
	selectedGuide: null,
	guideNodeData: null,
	guideEdgeData: null,
	selectedStart: null,
	currentNode: null,
	currentEdges: null,
	currentPath: [],
};

export const guideSlice = createSlice({
	name: 'guide',
	initialState,
	reducers: {
		reset: () => initialState,
		restart: (state) => {
			state.currentPath = [state.selectedStart];
			state.currentOptions = state.guideEdgeData.filter((el: { source: string }) => el.source == state.selectedStart.id);
			state.selectedNode = state.selectedStart;
		},
		setSelectedGuide: (state, action) => {
			state.selectedGuide = action.payload;
		},
		setGuideNodeData: (state, action) => {
			state.guideNodeData = action.payload;
		},
		setGuideEdgeData: (state, action) => {
			state.guideEdgeData = action.payload;
		},
		setGuideData: (state, action) => {
			state.guideNodeData = action.payload.nodeData;
			state.guideEdgeData = action.payload.edgeData;
		},
		setSelectedStart: (state, action) => {
			state.selectedStart = action.payload;
		},
		setCurrentNode: (state, action) => {
			state.currentNode = action.payload;
		},
		setCurrentEdges: (state, action) => {
			state.currentEdges = action.payload;
		},
		setCurrentPath: (state, action) => {
			state.currentPath = action.payload;
		},
	},
});

export const {
	reset,
	setSelectedGuide,
	setGuideNodeData,
	setGuideEdgeData,
	setCurrentNode,
	setSelectedStart,
	setCurrentEdges,
	setCurrentPath,
	setGuideData,
	restart,
} = guideSlice.actions;
export default guideSlice.reducer;

export const selectGuide = (state: any) => state.guide;
