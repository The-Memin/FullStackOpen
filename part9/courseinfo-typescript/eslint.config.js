import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    }
  },
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
            '@typescript-eslint/no-unused-vars': ['error'],
            '@/no-unused-vars': [
                'error',
                { 'argsIgnorePattern': '^_' }
            ],
            'no-case-declarations': 'off'
        }
    },
])
