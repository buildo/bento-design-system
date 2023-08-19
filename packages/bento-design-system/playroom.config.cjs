const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const { ProvidePlugin } = require("webpack");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  components: "./src/index.ts",
  outputPath: "./dist/playroom",
  title: "Bento 🍱",
  widths: [320, 425, 768, 1024, 1440, 2560],
  frameComponent: "./playroom/FrameComponent.tsx",
  webpackConfig: () => ({
    plugins: [
      new VanillaExtractPlugin(),
      new ProvidePlugin({
        React: "react",
      }),
      new MiniCssExtractPlugin({
        ignoreOrder: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2015",
          },
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          use: "file-loader",
        },
        {
          test: /(?!\.vanilla\.css)\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          exclude: (modulePath) => {
            return /node_modules/.test(modulePath) && !modulePath.includes("@fontsource");
          },
        },
        {
          test: /\.vanilla\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      minimizer: [new ESBuildMinifyPlugin({ target: "es2015" })],
    },
  }),
  exampleCode: `
<Box background="backgroundSecondary">
  <Inset spaceX={{ wide: "80", mobile: "24" }} spaceY={{ wide: "40", mobile: "40" }}>
    <Stack space="40" align="center">
      <Display size="small">Welcome to Bento DS Playroom</Display>
      <Stack space="16" align="center">
        <Body size="large">This Playroom is an interactive space where you can test the potential of Bento DS.</Body>
        <Body size="large">Test the whole structure of an interface, or start building a simple component, like this card:</Body>
      </Stack>
      <Card elevation="medium">
        <img alt="" src="https://fffuel.co/images/dddepth-preview/dddepth-261.jpg" width="100%" />
        <Inset spaceX="32" spaceY="24">
          <Stack space="4">
            <Title size="large">Card Title</Title>
            <Body size="large" color="secondary">Card description</Body>
          </Stack>
        </Inset>
      </Card>
    </Stack>
  </Inset>
</Box>
`,
};
