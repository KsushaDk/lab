import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from './modalSlice';

const rootReducer = combineReducers({
	modal: modalSlice,
});

export default rootReducer;
