import { eslintBaseRules } from './eslintBaseRules';
import { eslintImportRules } from './eslintImportRules';
import { eslintJsxAndHooksRules } from './eslintJsxAndHooksRules';
import { eslintTypescriptRules } from './eslintTypescriptRules';

export const eslintReact = {
  root: true,
  parser: 'babel-eslint',
  extends: ['eslint:recommended'],
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
  },

  settings: { react: { version: 'detect' }},

  rules: {
    ...eslintBaseRules,
    ...eslintImportRules,
    ...eslintJsxAndHooksRules,
  },

  overrides: [
    {
      files: [
        '**/*.ts',
        '**/*.tsx',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          legacyDecorators: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: { ...eslintTypescriptRules },
    },
  ],
};
