const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const path = require("path");

module.exports = {
  // TODO(gabro): restore this to "../stories/**/*.stories.*" once all stories are migrated
  stories: [
    "../stories/Components/Actions/*.stories.*",
    "../stories/Components/AreaLoader.stories.*",
    "../stories/Components/Avatar.stories.*",
    "../stories/Components/Banner.stories.*",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-themes"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
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
  docs: {
    autodocs: true,
  },
};
