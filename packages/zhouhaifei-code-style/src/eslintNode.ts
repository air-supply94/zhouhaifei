import { eslintBaseRules } from './eslintBaseRules';
import { eslintImportRules } from './eslintImportRules';
import { eslintTypescriptRules } from './eslintTypescriptRules';

export const eslintNode = {
  root: true,
  parser: 'babel-eslint',
  extends: ['eslint:recommended'],
  plugins: [
    'import',
    '@typescript-eslint',
  ],

  env: {
    worker: true,
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      ecmaVersion: 2018,
      legacyDecorators: true,
    },
  },

  settings: { react: { version: 'detect' }},

  rules: {
    ...eslintBaseRules,
    ...eslintImportRules,
  },

  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          ecmaVersion: 2018,
          legacyDecorators: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: eslintTypescriptRules,
    },
  ],
};
