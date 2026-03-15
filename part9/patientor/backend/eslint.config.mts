import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'],
        languageOptions: { globals: globals.browser } },
    {
        ignores: ['dist'],
        rules: {
            '@/semi': ['error'],
            '@/arrow-spacing': ['error', { before: true, after: true }],
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            indent: ['error', 4],
            quotes: ['error', 'single'],
            '@/explicit-function-return-type': 'off',
            '@/explicit-module-boundary-types': 'off',
            '@/restrict-template-expressions': 'off',
            '@/restrict-plus-operands': 'off',
            '@/no-unsafe-member-access': 'off',
            '@/no-unused-vars': [
                'error',
                { 'argsIgnorePattern': '^_' }
            ],
            'no-case-declarations': 'off'
        }
    },
    tseslint.configs.recommended,
]);
