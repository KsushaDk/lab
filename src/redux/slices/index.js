import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';

const rootReducer = combineReducers({
	users: userSlice,
});

export default rootReducer;
