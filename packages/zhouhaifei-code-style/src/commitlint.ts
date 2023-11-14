export const commitlint = {
  extends: [require.resolve('@commitlint/config-conventional')],
  rules: {
    'type-case': [
      2,
      'always',
      'camel-case',
    ],
    'scope-case': [
      1,
      'always',
      'camel-case',
    ],
  },
};
