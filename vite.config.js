import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@constants': path.resolve(
				__dirname,
				'./src/constants'
			),
			'@types': path.resolve(__dirname, './src/types'),
			'@lib': path.resolve(__dirname, './src/lib'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@store': path.resolve(__dirname, './src/store'),
			'@services': path.resolve(
				__dirname,
				'./src/services'
			),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@components': path.resolve(
				__dirname,
				'./src/components'
			),
			'@ui': path.resolve(__dirname, './src/components/ui'),
			'@forms': path.resolve(__dirname, './src/forms'),
			'@contexts': path.resolve(
				__dirname,
				'./src/contexts'
			),
			'@providers': path.resolve(
				__dirname,
				'./src/providers'
			),
			'@': path.resolve(__dirname, './src'),
		},
	},
});
