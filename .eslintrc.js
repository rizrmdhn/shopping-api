module.exports = {
  env: {
    es2021: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
  },
};
