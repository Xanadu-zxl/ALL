module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': [0, 'always'], // 尾逗号
    'space-before-function-paren': [0, 'always'], // 函数括号空格
    'space-before-function-paren': 0,
    indent: 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
