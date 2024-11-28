import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import react from "@vitejs/plugin-react";

const config: StorybookConfig = {
  stories: [{ directory: "../stories", files: "**/*.stories.*" }],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-themes"],
  framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      plugins: [react(), vanillaExtractPlugin()],
    });
  },
};

export default config;
