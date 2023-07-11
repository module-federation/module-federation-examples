const rules = {
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/ban-ts-ignore': 'off',
  // keep this til testing-library fixes their latest version of user-event library
  '@typescript-eslint/await-thenable': 'off',
  '@typescript-eslint/no-floating-promises': 'error',
};
const extendsOptions = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:jest/recommended',
  'prettier',
];

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      extends: extendsOptions,
      rules,
    },
  ],
  plugins: ['jest'],
  extends: [ 'prettier'],
  env: {
    'jest/globals': true,
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
};
