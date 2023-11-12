import type { GetPostcssConfigOptions } from '@zhouhaifei/postcss-preset';
import type Config from 'webpack-5-chain';
import type webpack from 'webpack';
import type { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { ManifestPluginOptions } from 'webpack-manifest-plugin';
import type HtmlWebpackPlugin from 'html-webpack-plugin';
import type { ProxyConfigMap } from 'webpack-dev-server';
import type { GetBabelConfigOptions } from '@zhouhaifei/babel-preset';
import type { TransformOptions as EsbuildOptions } from 'esbuild';
import type { MinifyOptions as TerserOptions } from 'terser';
import type { CssNanoOptions } from 'css-minimizer-webpack-plugin';
import type { UserConfig as ViteUserConfig } from 'vite';

export enum CliTool {
  vite = 'vite',
  webpack = 'webpack',
}

export enum Env {
  development = 'development',
  production = 'production',
}

export enum Transpiler {
  babel = 'babel',
  esbuild = 'esbuild',
  none = 'none',
}

export enum JSMinifier {
  terser = 'terser',
  esbuild = 'esbuild',
  none = 'none',
}

export enum CSSMinifier {
  esbuild = 'esbuild',
  cssnano = 'cssnano',
  none = 'none',
}

export interface CopyOptions {
  from: string;
  to: string;
}

export enum CodeSplit {
  default = 'default',
  depPerChunk = 'depPerChunk',
  granularChunks = 'granularChunks',
}

interface BaseConfig {
  transpiler?: keyof typeof Transpiler;
  esbuildLoaderOptions?: EsbuildOptions;
  babelLoaderOptions?: Record<string, any>;
  extraJsModuleIncludes?: Array<string | RegExp>;
  publicDir?: string;
  open?: boolean;
  port?: number;
  host?: string;
  proxy?: ProxyConfigMap;
  cache?: {
    buildDependencies?: string[];
    cacheDirectory?: string;
  };
  alias?: Record<string, string>;
  targets?: Record<'chrome' | 'edge' | 'safari' | 'firefox', string | number>;
  assetsInlineLimit?: number;
  outputPath?: string;
  publicPath?: string;
  define?: Record<string, any>;
  externals?: Record<string, string>;
  antd?: {
    libraryName?: 'antd' | 'antd-mobile';
    import?: boolean;
    momentPicker?: boolean;
  };
  watch?: boolean;
  staticPathPrefix?: string;
  reactRefresh?: boolean;
}

interface StyleConfig {
  autoCSSModules?: boolean;
  lessOptions?: Record<string, any>;
  sassOptions?: Record<string, any>;
  stylusOptions?: Record<string, any>;
  styleLoaderOptions?: false | Record<string, any>;
  cssLoaderModules?: Record<string, any>;
  cssLoaderOptions?: Record<string, any>;

  postcssPresetEnvOptions?: GetPostcssConfigOptions['postcssPresetEnvOptions'];
  autoprefixer?: GetPostcssConfigOptions['autoprefixer'];
  extraPostCSSPlugins?: GetPostcssConfigOptions['extraPostCSSPlugins'];
  postcssOptions?: GetPostcssConfigOptions['postcssOptions'];
}

export interface UserConfig extends BaseConfig, StyleConfig, GetBabelConfigOptions {
  nocompress?: boolean;
  jsMinifier?: keyof typeof JSMinifier;
  jsMinifierOptions?: EsbuildOptions | TerserOptions;
  cssMinifier?: keyof typeof CSSMinifier;
  cssMinifierOptions?: EsbuildOptions | CssNanoOptions | Record<string, any>;
  threadLoaderOptions?: Record<string, any>;
  codeSplitting?: keyof typeof CodeSplit;
  sourcemap?: Config.DevTool;
  preloadOptions?: false | Record<string, any>;
  forkTsCheckerOptions?: false | Record<string, any>;
  chainWebpack?: (
    memo: Config,
    args: {
      env: keyof typeof Env;
      webpack: typeof webpack;
    },
  ) => void | Promise<void>;
  analyzer?: BundleAnalyzerPlugin.Options;
  analyzerPort?: number;
  manifestOptions?: ManifestPluginOptions;
  ignoreMomentLocale?: boolean;
  copy?: CopyOptions[] | string[];
  deadCode?: { directories?: string[]; exclude?: string[]; root?: string; };
  htmlOption?: false | HtmlWebpackPlugin.Options;
  vite?: ViteUserConfig;
}

export interface WebpackConfigOptions {
  cwd: string;
  entry: Record<string, string>;
  userConfig: UserConfig;
  env: Env;
  userEnv?: Record<string, string>;
}

export type WebpackBuildOptions = Omit<WebpackConfigOptions, 'env'>;

export type WebpackDevOptions = Omit<WebpackConfigOptions, 'env'>;

export interface WebpackApplyOptions {
  readonly config: Config;
  readonly env: WebpackConfigOptions['env'];
  readonly cwd: WebpackConfigOptions['cwd'];
  readonly userConfig: UserConfig;
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly srcDir: string;
}

export interface ViteDevOptions {
  readonly cwd: WebpackConfigOptions['cwd'];
  readonly userConfig: UserConfig;
  readonly env: Env;
  readonly userEnv?: WebpackConfigOptions['userEnv'];
}

export interface cliOptions {
  config?: string;
  port?: string;
  host?: string;
  watch?: boolean;
  open?: boolean;
  vite?: boolean;
}
