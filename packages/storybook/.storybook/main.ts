const { vanillaExtractPlugin } = require("@vanilla-extract/vite-plugin");
import { mergeConfig } from "vite";

module.exports = {
  stories: ["../stories"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "storybook-addon-themes"
  ],
  framework: "@storybook/react-vite",
  features: {
    storyStoreV7: true,
  },
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
      optimizeDeps: {
        include: ["@buildo/bento-design-system"],
      },
    });
  },
};
