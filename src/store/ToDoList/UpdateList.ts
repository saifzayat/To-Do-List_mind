import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_ENDPOINTS } from '../../services/apiUrlConstants';
import { httpClient } from '../../services/http/httpsClient';
import type { ITodo } from '../../services/http/types';

export const UpdateList = createAsyncThunk<
	ITodo,
	ITodo,
	{ rejectValue: string }
>(
	'todo/UpdateList',
	async (updatedTodo, { rejectWithValue }) => {
		try {
			const data = await httpClient<ITodo>(
				`${API_ENDPOINTS.TODOS}/${updatedTodo.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(updatedTodo),
				}
			);
			return data;
		} catch (error) {
			const err =
				error instanceof Error
					? error.message
					: String(error);
			return rejectWithValue(err);
		}
	}
);
