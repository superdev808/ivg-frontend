import { Edge, Guide, Node } from '@/types/Guide';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GuideState = {
	guidesData: Guide[];
	nodesData: Node[];
	edgesData: Edge[];
};

const initialState: GuideState = {
	guidesData: [],
	nodesData: [],
	edgesData: []
};

export const guidesSlice = createSlice({
	name: 'guides',
	initialState,
	reducers: {
		reset: () => initialState,
		setGuidesData: (state, action) => {
			state.guidesData = action.payload.guidesData;
			state.nodesData = action.payload.nodesData;
			state.edgesData = action.payload.edgesData;
		},

	},
});

export const {
	reset,
	setGuidesData
} = guidesSlice.actions;
export default guidesSlice.reducer;

export const selectGuides = (state: any) => state.guides;
