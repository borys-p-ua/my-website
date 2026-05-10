import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importX from 'eslint-plugin-import-x'
import vitest from 'eslint-plugin-vitest'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },

  // Base (no type-info) for all files
  ...tseslint.configs.recommended,

  // Type-checked rules scoped to source files (test files have their own block below)
  {
    files: ['src/**/*.{ts,tsx}', 'vite.config.ts'],
    ignores: ['src/**/*.test.{ts,tsx}', 'src/test-setup.ts', 'src/vitest.d.ts'],
    extends: tseslint.configs.recommendedTypeChecked,
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'import-x': importX,
    },
    settings: {
      react: { version: 'detect' },
      'import-x/resolver': {
        typescript: { alwaysTryTypes: true },
        node: true,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-console': 'error',
      complexity: ['error', { max: 10 }],
      'import-x/no-cycle': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // Test files — relax unsafe rules that fire on testing-library types
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/test-setup.ts'],
    plugins: { vitest },
    languageOptions: {
      globals: vitest.environments.env.globals,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  }
)
