import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import * as path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [{ directory: "../stories", files: "**/*.stories.*" }],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-themes"],
  framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
    });
  },
};

export default config;
