module.exports = {
  root: true,
  env: {node: true},
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  plugins: ['vue', 'vuetify'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/return-in-computed-property':
        ['error', {treatUndefinedAsUnspecified: false}],
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-legacy-grid': 'error',
    'semi': [2, 'never'],
    'vue/max-attributes-per-line': 'off'
  },
  parserOptions: {parser: 'babel-eslint'}
}
