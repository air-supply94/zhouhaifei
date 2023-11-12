import type { UserConfig, cliOptions } from '../types';
import path from 'path';
import { CodeSplit, CSSMinifier, Env, JSMinifier, Transpiler } from '../types';
import { cwd, DEFAULT_BROWSER_TARGETS, DEFAULT_BUILD_DEVTOOL, DEFAULT_DEV_DEVTOOL, DEFAULT_OUTPUT_PATH } from '../constants';

export function initUserConfig(userConfig: UserConfig, cliOptions: cliOptions = {}): UserConfig {
  userConfig.publicDir ||= path.resolve(cwd, 'public');

  userConfig.open ||= cliOptions.open;
  userConfig.watch ||= cliOptions.watch;
  userConfig.host ||= cliOptions.host || process.env.HOST || '0.0.0.0';
  userConfig.port ||= parseInt(cliOptions.port, 10) || parseInt(process.env.PORT, 10) || 3000;

  userConfig.nocompress ||= process.env.COMPRESS === '1';
  userConfig.analyzer ||= process.env.ANALYZE === '1';
  userConfig.analyzerPort ||= parseInt(process.env.ANALYZE_PORT, 10) || 8888;
  userConfig.publicPath ||= process.env.PUBLIC_URL || '/';

  userConfig.sourcemap = userConfig.sourcemap === false || userConfig.sourcemap ? userConfig.sourcemap : process.env.NODE_ENV === Env.development ? DEFAULT_DEV_DEVTOOL : DEFAULT_BUILD_DEVTOOL;
  userConfig.outputPath ||= DEFAULT_OUTPUT_PATH;
  userConfig.externals ||= {};
  userConfig.alias ||= {};
  if (userConfig.alias['@'] == null) {
    userConfig.alias['@'] = path.resolve(cwd, 'src');
  }

  userConfig.staticPathPrefix ||= 'static/';
  userConfig.codeSplitting ||= CodeSplit.granularChunks;
  userConfig.antd ||= {};
  if (!userConfig.antd.libraryName) {
    userConfig.antd.libraryName = 'antd';
  }

  // antd4x使用babel-plugin-import
  // esbuild-loader加载antd style错乱
  // antd5x不会有问题
  userConfig.transpiler ||= Transpiler.babel;
  userConfig.jsMinifier ||= JSMinifier.esbuild;
  userConfig.cssMinifier ||= CSSMinifier.esbuild;
  userConfig.targets ||= DEFAULT_BROWSER_TARGETS;
  userConfig.assetsInlineLimit ||= 1024 * 8;
  userConfig.cache ||= {
    cacheDirectory: '.cache',
    buildDependencies: [],
  };

  userConfig.lessOptions = {
    javascriptEnabled: true,
    ...userConfig.lessOptions,
  };
  userConfig.sassOptions ||= {};
  userConfig.stylusOptions ||= {};
  userConfig.autoprefixer ||= {};
  userConfig.postcssPresetEnvOptions ||= {};

  return userConfig;
}
