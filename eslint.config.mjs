import {defineConfig} from 'eslint/config';
import tsparser from '@typescript-eslint/parser';
import tsplugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsplugin,
    },
    rules: {
      ...tsplugin.configs.recommended.rules,
      ...tsplugin.configs['recommended-type-checked'].rules,
    },
  },
  prettier,
]);

