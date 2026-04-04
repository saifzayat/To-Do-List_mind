import type { ITodo } from '../../services/http/types';

export interface ITodoState {
	items: ITodo[];
	currentItem: ITodo | null;
	isLoading: boolean;
	error: string | null;
}
