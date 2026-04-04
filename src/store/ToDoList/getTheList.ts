import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_ENDPOINTS } from '../../services/apiUrlConstants';
import { httpClient } from '../../services/http/httpsClient';
import type { ITodo } from '../../services/http/types';

export const getTheList = createAsyncThunk<
	ITodo[],
	unknown,
	{ rejectValue: string }
>('todo/getTheList', async (_, { rejectWithValue }) => {
	try {
		const data = await httpClient<ITodo[]>(
			API_ENDPOINTS.TODOS
		);

		return data;
	} catch (error) {
		const err =
			error instanceof Error
				? error.message
				: String(error);
		return rejectWithValue(err);
	}
});
