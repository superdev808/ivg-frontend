import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
	authenticated: null,
    session: null,
    isLoading: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
            if (action.payload) {
                state.authenticated = true;
                state.session = action.payload;
                state.isLoading = false;
            } else {
                state.authenticated = false;
                state.session = null;
                state.isLoading = false;
            }
		},
	},
});

export const {  setAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: any) => state.auth;
