export const prettier = {
  printWidth: 180,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  proseWrap: 'never',
  endOfLine: 'lf',
  arrowParens: 'always',
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
    {
      files: '*.ejs',
      options: { parser: 'html' },
    },
  ],
};
