import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

import { API_ENDPOINTS } from '../apiUrlConstants';
import { httpClient } from '../http/httpsClient';
import type { ITodo } from '../http/types';

export const useGetTodos = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: () => httpClient<ITodo[]>(API_ENDPOINTS.TODOS),
	});
};

export const useGetTodo = (id: string) => {
	return useQuery({
		queryKey: ['todos', id],
		queryFn: () =>
			httpClient<ITodo>(`${API_ENDPOINTS.TODOS}/${id}`),
		enabled: !!id,
	});
};

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newTodo: Omit<ITodo, 'id'>) =>
			httpClient<ITodo>(API_ENDPOINTS.TODOS, {
				method: 'POST',
				body: JSON.stringify(newTodo),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todos'],
			});
		},
	});
};

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (updatedTodo: ITodo) =>
			httpClient<ITodo>(
				`${API_ENDPOINTS.TODOS}/${updatedTodo.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(updatedTodo),
				}
			),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todos'],
			});
		},
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) =>
			httpClient<unknown>(`${API_ENDPOINTS.TODOS}/${id}`, {
				method: 'DELETE',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todos'],
			});
		},
	});
};
