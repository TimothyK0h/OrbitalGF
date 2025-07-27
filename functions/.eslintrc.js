module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "google",
    "plugin:import/recommended"
  ],
  plugins: ["import"],
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],
    "import/no-unresolved": "off",   
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true
      },
      rules: {}
    }
  ]
};
