import {
	API_CONFIG,
	BASE_BACKEND_URL,
} from '../../apiUrlConstants';

export const httpClient = async <T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> => {
	const url = `${BASE_BACKEND_URL}${endpoint}`;

	const headers = {
		'Content-Type': 'application/json',
		...(options.headers || {}),
	};

	const controller = new AbortController();
	const timeoutId = setTimeout(
		() => controller.abort(),
		API_CONFIG.TIMEOUT
	);

	try {
		const response = await fetch(url, {
			...options,
			headers,
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(
				`HTTP error! status: ${response.status}`
			);
		}

		return (await response.json()) as T;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(
			`[httpClient] ${options.method || 'GET'} ${url} failed`,
			error
		);
		throw error;
	}
};

export default httpClient;
