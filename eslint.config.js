import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	// Astro recommended configs - this handles .astro files
	...eslintPluginAstro.configs.recommended,

	// Base configuration for JS/TS files
	{
		files: ['**/*.{js,ts}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'no-console': 'off',
			'no-unused-vars': 'warn',
		},
	},

	// Ignore patterns
	{
		ignores: ['dist/', 'node_modules/', '.astro/', '*.min.js'],
	},
];
