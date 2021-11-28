/* eslint-disable prettier/prettier */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  extends: [
    // 'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 13
  },
  rules: {
    'strict': 'off',
    'no-console': 'off' // 屏蔽no- console警告
  }
}
