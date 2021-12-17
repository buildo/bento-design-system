const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  plugins: [new VanillaExtractPlugin(), new MiniCssExtractPlugin({ filename: "index.css" })],
  entry: { index: "./src/index.ts" },
  externals: {
    react: "react",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve("css-loader"),
            options: {
              url: false, // Image imports should be handled via JS/TS import statements
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
    clean: true,
  },
};
