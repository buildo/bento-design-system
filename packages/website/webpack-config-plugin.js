// @ts-check
import { ProvidePlugin } from "webpack";

module.exports = function () {
  return {
    name: "webpack-config-plugin",
    configureWebpack(config, isServer, utils) {
      if (isServer) {
        return config;
      }
      return {
        ...config,
        plugins: [
          ...config.plugins,
          new ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
          }),
          new ProvidePlugin({
            process: "process/browser",
          }),
        ],
      };
    },
  };
};
