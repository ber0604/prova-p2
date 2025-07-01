import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'prefer-const': 'error', // Use const se a variável não muda
      'no-console': 'warn', // Alerta se usar console.log
      'consistent-return': 'warn', // Garante funções que retornem sempre algo
      'prefer-template': 'warn', // Prefere template strings em vez de
    },
  },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
]);
