import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

import { store } from './store/index.ts';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App.js';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
