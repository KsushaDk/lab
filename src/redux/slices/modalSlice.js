import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: {
		isActive: false,
		message: '',
		isSubmitted: false,
	},
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalState(state, action) {
			state.modal = action.payload;
		},
	},
});

export const { setModalState } = modalSlice.actions;
export default modalSlice.reducer;
