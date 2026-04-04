export interface ITodo {
	id: string;
	title: string;
	description: string;
	column: string;
	status: 'high' | 'medium' | 'low' | 'done';
}
