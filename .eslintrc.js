module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  plugins: ['import'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 0,
    'arrow-parens': ['error', 'as-needed'],
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
