export const BASE_BACKEND_URL =
	import.meta.env.VITE_API_URL ||
	'http://localhost:30016/api/v1';

export const API_ENDPOINTS = {
	TODOS: '/todos',
};

export const API_CONFIG = {
	TIMEOUT:
		Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
};
