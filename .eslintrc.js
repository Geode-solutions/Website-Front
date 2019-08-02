module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  plugins: [
    'vue',
    'vuetify'
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/return-in-computed-property": [
      "error",
      {
        treatUndefinedAsUnspecified: false
      }
    ],
    'vuetify/no-deprecated-classes': 'error'
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "semi": [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off"
  }
};
