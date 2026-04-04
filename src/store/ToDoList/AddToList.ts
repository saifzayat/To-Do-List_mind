import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_ENDPOINTS } from '../../services/apiUrlConstants';
import { httpClient } from '../../services/http/httpsClient';
import type { ITodo } from '../../services/http/types';

export const AddToList = createAsyncThunk<
	ITodo,
	Omit<ITodo, 'id'>,
	{ rejectValue: string }
>(
	'todo/AddToList',
	async (newTodo, { rejectWithValue }) => {
		try {
			const data = await httpClient<ITodo>(
				API_ENDPOINTS.TODOS,
				{
					method: 'POST',
					body: JSON.stringify(newTodo),
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
