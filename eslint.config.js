import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
	// Astro recommended configs - this handles .astro files
	...eslintPluginAstro.configs.recommended,

	// Base configuration for JS/TS files
	{
		files: ['**/*.{js,ts}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
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
