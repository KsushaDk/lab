import { createSlice } from '@reduxjs/toolkit';
import { dataInterviews } from 'Utils/constants';

const initialState = {
	interviews: [...dataInterviews],
};

const interviewSlice = createSlice({
	name: 'interviews',
	initialState,
	reducers: {
		// addInterview(state, action) {
		// 	state.interviews.push(action.payload);
		// },
		updateInterviews(state, action) {
			state.interviews = action.payload;
		},
	},
});

export const { addInterview, updateInterviews } = interviewSlice.actions;
export default interviewSlice.reducer;
