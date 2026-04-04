import { combineReducers } from '@reduxjs/toolkit';

import todoReducer from './ToDoList';

const rootReducer = combineReducers({
	todo: todoReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
