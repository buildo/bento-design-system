import { vanillaExtractFilescopePlugin, virtualCssFileFilter, getSourceFromVirtualCssFile, cssFileFilter, compile, processVanillaFile } from '@vanilla-extract/integration';

const vanillaCssNamespace = 'vanilla-extract-css-ns';
function vanillaExtractPlugin({
  outputCss,
  externals = [],
  runtime = false,
  processCss,
  identifiers
} = {}) {
  if (runtime) {
    // If using runtime CSS then just apply fileScopes to code
    return vanillaExtractFilescopePlugin();
  }

  return {
    name: 'vanilla-extract',

    setup(build) {
      build.onResolve({
        filter: virtualCssFileFilter
      }, args => {
        return {
          path: args.path,
          namespace: vanillaCssNamespace
        };
      });
      build.onLoad({
        filter: /.*/,
        namespace: vanillaCssNamespace
      }, async ({
        path
      }) => {
        let {
          source
        } = getSourceFromVirtualCssFile(path);

        if (typeof processCss === 'function') {
          source = await processCss(source);
        }

        return {
          contents: source,
          loader: 'css'
        };
      });
      build.onLoad({
        filter: cssFileFilter
      }, async ({
        path
      }) => {
        const {
          source,
          watchFiles
        } = await compile({
          filePath: path,
          externals,
          cwd: build.initialOptions.absWorkingDir
        });
        const contents = await processVanillaFile({
          source,
          filePath: path,
          outputCss,
          identOption: identifiers !== null && identifiers !== void 0 ? identifiers : build.initialOptions.minify ? 'short' : 'debug'
        });
        return {
          contents,
          loader: 'js',
          watchFiles
        };
      });
    }

  };
}

export { vanillaExtractPlugin };
