module.exports = {
	'*.{js,jsx,ts,tsx}': [
		'node remove_console.js',
		'prettier --write',
		'eslint --fix',
	],
	'*.{ts,tsx}': [
		() => 'tsc --project tsconfig.json',
		'eslint --cache --fix',
	],
};
