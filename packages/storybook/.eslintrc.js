module.exports = {
  extends: ["../../.eslintrc.js", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["**/*.stories.tsx"],
      rules: {
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
};
