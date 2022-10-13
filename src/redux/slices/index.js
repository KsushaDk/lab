import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import modalSlice from './modalSlice';

const rootReducer = combineReducers({
	users: userSlice,
	modal: modalSlice,
});

export default rootReducer;
