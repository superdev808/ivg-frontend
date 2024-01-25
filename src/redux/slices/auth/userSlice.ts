import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/UserTypes';

 // @ts-ignore
const userAdapter = createEntityAdapter<User>({selectId: (user:User) => user.id});

const initialState = userAdapter.getInitialState();

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: userAdapter.addOne,
		updateUser: (state, action) => {
            userAdapter.updateOne(state, action.payload);
        },
		removeUser: userAdapter.removeOne,
	},
});

export const { addUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

// Export the adapter's selectors
export const { selectAll: selectAllUsers, selectById: selectUserById } = userAdapter.getSelectors((state: any) => state.nodes);
