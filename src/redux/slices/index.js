import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import interviewSlice from './interviewSlice';
import modalSlice from './modalSlice';

const rootReducer = combineReducers({
	users: userSlice,
	interviews: interviewSlice,
	modal: modalSlice,
});

export default rootReducer;
