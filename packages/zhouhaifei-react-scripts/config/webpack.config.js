'use strict';

const getClientEnvironment = require('./env');
const fs = require('fs');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const compressionPlugin = require('compression-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const webpack = require('webpack');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const manifestPlugin = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const webpackBar = require('webpackbar');
const workboxWebpackPlugin = require('workbox-webpack-plugin');
const modules = require('./modules');
const paths = require('./paths');
const utils = require('./utils');

const useTypeScript = fs.existsSync(paths.appTsConfig);

module.exports = function() {
  const initConfig = {
    mode: utils.isProduction ? 'production' : utils.isDevelopment && 'development',

    // Stop compilation early in production
    bail: utils.isProduction,
    devtool: utils.sourceMap,
    entry: require('./entry'),
    output: require('./output'),
    optimization: require('./optimization'),
    resolve: {
      modules: [
        'node_modules',
        paths.appNodeModules,
      ],

      extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`).filter((ext) => useTypeScript || !ext.includes('ts')),
      alias: {
        'react-native': 'react-native-web',

        ...(utils.isProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
      plugins: [
        /* Adds support for installing with Plug'n'Play, leading to faster installs and adding
           guards against forgotten dependencies and such. */
        PnpWebpackPlugin,

        /* Prevents users from importing files from outside of src/ (or node_modules/).
           This often causes confusion because we only process files within src/ with babel.
           To fix this, we prevent you from importing files out of src/ -- if you'd like to,
           please link the files into your node_modules/ and let module-resolution kick in.
           Make sure your source files are compiled, as they will not be processed in any way. */
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      ],
    },
    resolveLoader: {
      plugins: [
        /* Also related to Plug'n'Play, but this time it tells webpack to load its loaders
           from the current package. */
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false }},
        require('./eslintConfig'),
        {
          oneOf: [
            ...require('./jsAndTsConfig'),
            ...require('./style'),
            ...require('./staticResource'),
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(require('./htmlWebpackPlugin')),

      new webpack.DefinePlugin(getClientEnvironment(paths.publicUrlOrPath.slice(0, -1)).stringified),
      utils.isDevelopment && new CaseSensitivePathsPlugin(),
      utils.isDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      utils.isProduction && new MiniCssExtractPlugin({
        filename: `${utils.resourceName.css}/[name].[contenthash].css`,
        chunkFilename: `${utils.resourceName.css}/[name].[contenthash].css`,
      }),

      utils.isProduction && new webpackBar({ profile: false }),
      utils.isProduction && new bundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerHost: utils.host,
        analyzerPort: utils.port + 1,
      }),

      // gzip压缩
      utils.isProduction && new compressionPlugin({
        test: /\.(js|css|html|svg)$/,
        cache: false,
        algorithm: 'gzip',
        compressionOptions: {
          level: 9,
          threshold: 0,
          minRatio: 0.8,
        },
      }),

      // br压缩
      utils.isProduction && parseInt(process.versions.node, 10) >= 12 && new compressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 0,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),

      // 复制依赖文件
      utils.isProduction && fs.existsSync(path.resolve(paths.appPublic, 'assets')) && new copyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(paths.appPublic),
            to: path.resolve(paths.appDist),
          },
        ],
      }),

      // 清除原先打包内容
      utils.isProduction && new cleanWebpackPlugin(),

      utils.isDevelopment && new webpack.HotModuleReplacementPlugin(),
      utils.isProduction && new manifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = Object.values(entrypoints).reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
            .filter((fileName) => !fileName.endsWith('.map'));

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      utils.isProduction && utils.isStartServiceWorker && new workboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [
          /\.map$/,
          /asset-manifest\.json$/,
          /envConfig\.js$/,
        ],
        navigateFallback: `${paths.publicUrlOrPath}index.html`,
      }),

      // TypeScript type checking
      useTypeScript && new ForkTsCheckerWebpackPlugin({
        async: utils.isDevelopment,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        tsconfig: paths.appTsConfig,
        reportFiles: [
          '**',
          '!**/__tests__/**',
          '!**/?(*.)(spec|test).*',
          '!**/src/setupProxy.*',
        ],
        watch: paths.appSrc,
        silent: true,
      }),

    ].filter(Boolean),

    /* Some libraries import Node modules but don't use them in the browser.
       Tell webpack to provide empty mocks for them so importing them works. */
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },

    /* Turn off performance processing because we utilize
       our own hints via the FileSizeReporter */
    performance: false,
  };

  const outConfig = path.resolve(paths.appPath, 'webpack.config.js');
  return fs.existsSync(outConfig) ? merge(initConfig, require(outConfig)(utils)) : initConfig;
};
