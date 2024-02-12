import { getUserRole } from '@/helpers/getUserRole';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    authenticated: null,
    role: null,
    isLoading: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            if (action.payload) {
                state.authenticated = true;
                state.role = getUserRole();
                state.isLoading = false;
            } else {
                state.authenticated = false;
                state.role = null;
                state.isLoading = false;
            }
        },
    },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: any) => state.auth;
