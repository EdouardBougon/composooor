module.exports = {
  extends: ['@antib-es/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    'artifacts',
    'cache',
    'coverage',
    'typechain-types',
  ],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
  },
};
