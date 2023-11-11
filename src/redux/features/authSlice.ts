import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
	authenticated: false,
    session: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
            if (action.payload) {
                state.authenticated = true;
                state.session = action.payload;
            } else {
                state.authenticated = false;
                state.session = null;
            }
		},
	},
});

export const {  setAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: any) => state.auth;
