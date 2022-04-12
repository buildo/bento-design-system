const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.*"],
  addons: ["storybook-addon-essentials"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: (baseConfig) => {
    const { module = {}, plugins = {} } = baseConfig;

    // by default, the rules for jsx|tsx files are including the whole monorepo root,
    // but it's enough to check only the storybook package
    const tsxRules = module.rules.filter((rule) => rule?.test?.test("test.tsx"));
    tsxRules.forEach((rule) => {
      rule.include = [path.resolve(__dirname, "../")];
    });

    return {
      ...baseConfig,
      plugins: [...plugins, new VanillaExtractPlugin(), new MiniCssExtractPlugin()],
    };
  },
};
