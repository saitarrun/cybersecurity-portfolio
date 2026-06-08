import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        console: true,
        process: true,
        window: true,
        document: true,
        fetch: true,
        URLSearchParams: true,
        MouseEvent: true,
        HTMLDivElement: true,
        HTMLSpanElement: true,
        HTMLInputElement: true,
        HTMLTextAreaElement: true,
        HTMLElement: true,
        DOMRect: true,
        MediaQueryListEvent: true,
        KeyboardEvent: true,
        AbortController: true,
        TextDecoder: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        getComputedStyle: true,
        React: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-types': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      eqeqeq: ['error', 'always'],
    },
  },
  {
    files: ['vite.config.ts', 'tailwind.config.js'],
    languageOptions: {
      globals: {
        __dirname: true,
        __filename: true,
      },
    },
  },
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '.vercel/',
      '.claude/',
      'eslint.config.js',
      '.env*',
      '*.min.js',
      '*.min.css',
      '.next/',
      '.husky/',
    ],
  },
];
