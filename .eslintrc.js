module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  'extends': [],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    "sourceType": "module",
    parser: 'babel-eslint',
    "ecmaVersion": 2018
  }
}
