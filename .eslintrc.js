module.exports = {
  extends: ["react-app"],
  parser: "@typescript-eslint/parser",
  plugins: ["sort-export-all"],
  root: true,
  rules: {
    "array-callback-return": "off",
    "no-fallthrough": "off",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/jsx-pascal-case": "off",
    "react/jsx-curly-brace-presence": "warn",
    "import/no-duplicates": "error",
    "sort-export-all/sort-export-all": "error",
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};
