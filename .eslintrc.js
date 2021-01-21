module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-unused-vars': 2, // explicitly mark it as Error not Warning (as from tsconfig)
    '@typescript-eslint/no-use-before-define': 0,
    'prettier/prettier': ['error'],
    'react/display-name': 0,
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  // plugins: ['@typescript-eslint', 'prettier'],
  // parserOptions: {
  //   tsconfigRootDir: __dirname,
  //   project: './tsconfig.json',
  // },
}
