import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import interviewSlice from './interviewSlice';

const rootReducer = combineReducers({
	users: userSlice,
	interviews: interviewSlice,
});

export default rootReducer;
