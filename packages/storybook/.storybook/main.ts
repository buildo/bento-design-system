import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
// @ts-expect-error
import * as path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: [{ directory: "../stories", files: "**/*.stories.*" }],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-themes"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: (baseConfig) => {
    const { module: { rules = [] } = {}, plugins = [] } = baseConfig;

    // by default, the rules for jsx|tsx files are including the whole monorepo root,
    // but it's enough to check only the storybook package
    const tsxRules = rules.filter((rule: any) => rule?.test?.test("test.tsx"));
    tsxRules?.forEach((rule: any) => {
      rule.include = [
        // @ts-expect-error
        path.resolve(__dirname, "../"),
      ];
    });
    return {
      ...baseConfig,
      plugins: [...plugins, new VanillaExtractPlugin(), new MiniCssExtractPlugin()],
    };
  },
};

export default config;
