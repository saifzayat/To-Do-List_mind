import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

export const store = configureStore({
	reducer: rootReducer,
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = () =>
	useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> =
	useSelector;
