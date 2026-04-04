import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_ENDPOINTS } from '../../services/apiUrlConstants';
import { httpClient } from '../../services/http/httpsClient';

export const deleteFromList = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>(
	'todo/deleteFromList',
	async (id, { rejectWithValue }) => {
		try {
			await httpClient(`${API_ENDPOINTS.TODOS}/${id}`, {
				method: 'DELETE',
			});

			return id;
		} catch (error) {
			const err =
				error instanceof Error
					? error.message
					: String(error);
			return rejectWithValue(err);
		}
	}
);
