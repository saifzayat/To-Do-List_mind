import { createSlice } from '@reduxjs/toolkit';

import type { ITodoState } from '../types';

import { AddToList } from './AddToList';
import { deleteFromList } from './deleteFromList';
import { getById } from './getById';
import { getTheList } from './getTheList';
import { UpdateList } from './UpdateList';

const initialState: ITodoState = {
	items: [],
	currentItem: null,
	isLoading: false,
	error: null,
};

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		clearCurrentItem: state => {
			state.currentItem = null;
		},
		clearError: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			// getTheList
			.addCase(getTheList.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getTheList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload;
			})
			.addCase(getTheList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Unknown error';
			})
			// getById
			.addCase(getById.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentItem = action.payload;
			})
			.addCase(getById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Unknown error';
			})
			// AddToList
			.addCase(AddToList.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			// UpdateList
			.addCase(UpdateList.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					i => i.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
				if (state.currentItem?.id === action.payload.id) {
					state.currentItem = action.payload;
				}
			})
			// deleteFromList
			.addCase(
				deleteFromList.fulfilled,
				(state, action) => {
					state.items = state.items.filter(
						i => i.id !== action.payload
					);
					if (state.currentItem?.id === action.payload) {
						state.currentItem = null;
					}
				}
			);
	},
});

export const { clearCurrentItem, clearError } =
	todoSlice.actions;

export {
	AddToList,
	deleteFromList,
	getById,
	getTheList,
	UpdateList,
};

export default todoSlice.reducer;
