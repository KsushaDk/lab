import { createSlice } from '@reduxjs/toolkit';
import { dataUsers } from 'Utils/constants';

const initialState = {
	users: [...dataUsers],
	currentUser: null,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser(state, action) {
			state.users.push(action.payload);
		},
		deleteUser(state, action) {
			state.users.filter((user) => user.id !== action.payload.id);
		},
		loginUser(state, action) {
			state.currentUser = action.payload;
		},
		logoutUser(state) {
			state.currentUser = null;
		},
	},
});

export const { addUser, deleteUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
