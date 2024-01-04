import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
	transparentNavBar: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		reset: () => initialState,
		setTransparentNavBar: (state, action) => {
			state.transparentNavBar = action.payload;
		},
	},
});

export const { reset, setTransparentNavBar } = uiSlice.actions;
export default uiSlice.reducer;

export const uiState = (state: any) => state.route;
