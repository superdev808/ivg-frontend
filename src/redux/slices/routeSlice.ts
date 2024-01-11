import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
	route: null,
};

export const routeSlice = createSlice({
	name: 'route',
	initialState,
	reducers: {
		reset: () => initialState,
		setRoute: (state, action) => {
			state.route = action.payload;
		},
	},
});

export const { reset, setRoute } = routeSlice.actions;
export default routeSlice.reducer;

export const routeState = (state: any) => state.route;
