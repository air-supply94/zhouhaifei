## 项目生成

### node

- 建议 >= 16.20.1

### 生成

```shell
mkdir 目录名称
cd 目录名称
npx -p yo -p generator-zhouhaifei-react -c "yo zhouhaifei-react"
```

### 下载

```shell
yarn install
```

## windows 换行符设置

### git 换行符相关配置说明

```bash
# 提交时验证
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true

# 允许提交包含混合换行符的文件
git config --global core.safecrlf false

# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn

# 下拉提交时操作
# 提交时转换为LF,检出时转换为CRLF
git config --global core.autocrlf true

# 提交时转换为LF,检出时不转换
git config --global core.autocrlf input

# 提交检出均不转换
git config --global core.autocrlf false
```

### windows 参考配置

```bash
git config --global core.safecrlf false
git config --global core.autocrlf input
```

## 配置文件

- 默认是项目根目录下的 bundlerConfig.ts
- 也可以通过 cli 的-c --config 指定配置文件(相对项目根目录的路径)

## 环境变量配置文件

- .env
- .env.local
- .env.development 或者.env.production
- .env.development.local 或者.env.production.local
- 优先级由上倒下,且通过上面文件配置的环境变量都可以通过 process.env 获取
- 内置了 process.env.NODE_ENV 和 process.env.PUBLIC_URL 和 process.env.CLI_TOOL(vite 或 webpack)

## 项目常见命令

### dev 以 vite 模式启动

- **_vite 模式只支持 dev_**

```shell
zhouhaifei-bundler-cli dev --vite
```

### dev 以 webpack 模式启动

```shell
zhouhaifei-bundler-cli dev
```

### webpack 打包

```shell
zhouhaifei-bundler-cli build
```

### 命令行界面

| 选项                | 说明                 | 适用环境     |
| ------------------- | -------------------- | ------------ |
| --port=xxx          | 指定端口             | dev          |
| --host=xxx          | 指定 host            | dev          |
| --open              | 是否打开浏览器       | dev          |
| --vite              | 以 vite 模式启动     | dev          |
| --watch             | 文件变动是否重新打包 | build        |
| -c=xxx --config=xxx | 指定配置文件         | dev 和 build |

# 配置文件属性说明

## 基本属性

### transpiler

- 描述: 配置构建时转译 js/ts 的工具
- 类型: 'esbuild' | 'babel'
- 默认值: 'babel'
- 兼容模式: webpack
- 说明 1: esbuild 时使用 esbuild-loader,babel 时使用 babel-loader
- 说明 2: esbuild 时 antd4 的 style 按需引入样式有问题
- 说明 3: antd5 或者不使用 antd 时配置成 esbuild 速度更快

### [esbuildLoaderOptions](https://www.npmjs.com/package/esbuild-loader)

- 描述: esbuild-loader 配置
- 类型: Record<string, any>
- 默认值: {target: 'es2015'}
- 兼容模式: webpack 模式使用 esbuild 转译

### [babelLoaderOptions](https://www.npmjs.com/package/babel-loader)

- 描述: babel-loader 配置
- 类型: Record<string, any>
- 默认值: {sourceType: 'unambiguous', babelrc: false, configFile: false, cacheDirectory: true, browserslistConfigFile: false, targets: '传入的 targets'}
- 兼容模式: webpack 使用 babel 转译

### extraJsModuleIncludes

- 描述: 额外转化 js 的 include
- 说明: 默认只会对当前目录排除 node_modules 下的文件转译
- 类型: Array<string | RegExp>
- 默认值: []
- 兼容模式: webpack

### publicDir

- 描述: 静态资源的文件夹
- 类型: string
- 默认值: 根目录下 public 文件夹
- 兼容模式: vite 和 webpack

### open

- 描述: dev 模式是否打开浏览器
- 类型: boolean
- 默认值: false
- 兼容模式: vite 和 webpack

### port

- 描述: dev 模式下 server 的端口
- 类型: number
- 默认值: 3000
- 兼容模式: vite 和 webpack
- 其他说明: 支持环境变量**_PORT_**

### host

- 描述: dev 模式下 server 的 host
- 类型: string
- 默认值: '0.0.0.0'
- 兼容模式: vite 和 webpack
- 其他说明: 支持环境变量**_HOST_**

### proxy

- 描述: dev 模式下 server 的 代理配置
- 类型: [ProxyConfigMap](https://webpack.js.org/configuration/dev-server/#devserverproxy)---只支持对象形式
- 默认值: {}
- 兼容模式: vite 和 webpack

### cache

- 描述: 缓存相关配置
- 类型: {buildDependencies?: string[]; cacheDirectory?: string;}
- 默认值: {buildDependencies: [] cacheDirectory: 根目录下.cache}
- 兼容模式: vite 和 webpack

### alias

- 描述: 别名设置
- 类型: Record<string, string>
- 默认值: {'@': '根目录的 src 文件夹'}
- 兼容模式: vite 和 webpack

### targets

- 描述: 浏览器兼容性
- 类型: Record<'chrome' | 'edge' | 'safari' | 'firefox', string | number>
- 默认值: {chrome: 80, edge: 79, firefox: 78, safari: 11}
- 兼容模式: vite 和 webpack
- 说明: babel 及 postcss 相关浏览器配置会根据此自动生成

### assetsInlineLimit

- 描述: 静态资源 base64 阀值
- 类型: number
- 默认值: 8 \* 1024
- 兼容模式: vite 和 webpack

### outputPath

- 描述: 打包生成目录
- 类型: string
- 默认值: 项目根目录下 dist 文件夹
- 兼容模式: webpack

### publicPath

- 描述: 资源 url 前缀
- 类型: string
- 默认值: '/'
- 兼容模式: webpack
- 说明: 支持环境变量**_PUBLIC_URL_**

### define

- 描述: 定义全局常量替换方式
- 类型: Record<string, any>
- 默认值: {}
- 兼容模式: vite 和 webpack
- 说明 1: 内置了 process.env.PUBLIC_URL 和 process.env.NODE_ENV 和 process.env.CLI_TOOL
- 说明 2: 环境变量配置文件生成的 env 合并到 process.env

### externals

- 描述: 阻止打包配置
- 类型: Record<string, string>
- 默认值: {}
- 兼容模式: webpack
- 说明: 内置 externalsType=window

### watch

- 描述: 文件变动是否重新打包
- 类型: boolean
- 默认值: false
- 兼容模式: webpack

### staticPathPrefix

- 描述: 静态资源路径前缀
- 类型: string
- 默认值: 'static/'
- 兼容模式: webpack

### reactRefresh

- 描述: 是否开启 reactRefresh
- 类型: boolean
- 默认值: false
- 兼容模式: vite 和 webpack

### antd

- 描述: antd 相关配置
- 类型: {libraryName?: 'antd' | 'antd-mobile'; import?: boolean; momentPicker?: boolean;}
- 默认值: {libraryName: 'antd'}
- 兼容模式: vite 和 webpack
- 说明 1: import 是否开启 style 按需引入,antd4 建议开启
- 说明 2: momentPicker 是否开启 moment 替换 dayjs,antd5 只适配 webpack

## babel 相关配置

```ts
export interface GetBabelConfigOptions {
  babelExtraPreset?: any;
  babelExtraPlugins?: any;
  babelPresetEnv?: {
    targets: string | string[] | Record<string, string>;
    bugfixes?: boolean;
    spec?: boolean;
    loose?: boolean;
    modules?: 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
    debug?: boolean;
    include?: Array<string | RegExp>;
    exclude?: Array<string | RegExp>;
    useBuiltIns?: 'usage' | 'entry' | false;
    corejs?: { version: string; proposals: boolean };
    configPath?: string;
    ignoreBrowserslistConfig?: boolean;
    browserslistEnv?: string;
    shippedProposals?: boolean;
  };
  babelPresetReact?:
    | false
    | {
        runtime?: 'classic' | 'automatic';
        development?: boolean;
        throwIfNamespace?: boolean;
        pure?: boolean;
        importSource?: string;
        pragma?: string;
        pragmaFrag?: string;
      };
  babelPresetTypeScript?: {
    isTSX?: boolean;
    jsxPragma?: string;
    jsxPragmaFrag?: string;
    allExtensions?: boolean;
    allowNamespaces?: boolean;
    allowDeclareFields?: boolean;
    disallowAmbiguousJSXLike?: boolean;
    onlyRemoveTypeImports?: boolean;
    optimizeConstEnums?: boolean;
    rewriteImportExtensions?: boolean;
  };
  babelPluginTransformRuntime?:
    | false
    | {
        corejs?: false | 2 | 3 | { version: 2 | 3; proposals: boolean };
        helpers?: boolean;
        regenerator?: boolean;
        absoluteRuntime?: string | boolean;
        version?: string;
      };
  babelPluginDecorators?:
    | false
    | {
        version?: '2023-05' | '2023-01' | '2022-03' | '2021-12' | '2018-09' | 'legacy';
        decoratorsBeforeExport?: boolean;
      };
  babelClassProperties?: { loose?: boolean };
  babelPluginStyledComponents?: Record<string, any>;
}
```

### [babelExtraPreset](https://babeljs.io/docs/presets)

- 类型: any[]

### [babelExtraPlugins](https://babeljs.io/docs/plugins-list)

- 类型: any[]
- 说明 1: 内置了@babel/preset-env 支持的插件
- 说明 2: Proposals 插件按下面配置按需开启

### [babelPresetEnv](https://babeljs.io/docs/babel-preset-env)

- 默认值

```json
{
  "bugfixes": true,
  "loose": true,
  "modules": false,
  "debug": false,
  "useBuiltIns": "usage",
  "corejs": {
    "version": "@zhouhaifei/babel-preset包对应core/js版本",
    "proposals": true
  },
  "ignoreBrowserslistConfig": true
}
```

### [babelPresetReact](https://babeljs.io/docs/babel-preset-react)

- 说明: false 关闭此内置,默认开启
- 默认值

```json
{
  "runtime": "automatic",
  "development": process.env.NODE_ENV === "development"
}
```

### [babelPresetTypeScript](https://babeljs.io/docs/babel-preset-typescript)

- 默认值

```json
{
  "allowNamespaces": true,
  "allowDeclareFields": true,
  "onlyRemoveTypeImports": false,
  "optimizeConstEnums": true
}
```

### [babelPluginTransformRuntime](https://babeljs.io/docs/babel-plugin-transform-runtime)

- 说明: false 关闭此插件,webpack 中 babel 模式下默认开启,vite 模式默认关闭

```json
{
  "helpers": true,
  "regenerator": true,
  "absoluteRuntime": "@zhouhaifei/babel-preset包对应的路径",
  "version": "@zhouhaifei/babel-preset包@babel/runtime的版本"
}
```

### [babelPluginDecorators](https://babeljs.io/docs/babel-plugin-proposal-decorators)

- 说明: false 关闭此插件,webpack 模式和 vite 模式默认开启
- 默认值

```json
{ "version": "legacy" }
```

### [babelClassProperties](https://babeljs.io/docs/babel-plugin-transform-class-properties)

- 说明 1: webpack 模式 babel 模式默认开启
- 说明 2: vite 模式下@babel/plugin-proposal-class-properties、@babel/plugin-proposal-private-methods、@babel/plugin-proposal-private-property-in-object 插件默认开启且 loose 默认为 true

### [babelPluginStyledComponents](https://www.npmjs.com/package/babel-plugin-styled-components)

- 默认值: undefined(不开启)

## style 相关配置

### autoCSSModules

- 描述 1: 是否开启全局 css module
- 描述 2: 排除 src/global.\[css|less|sass|scss|styl|stylus]文件和 node_modules
- 类型: boolean
- 默认值: true
- 兼容模式: vite 和 webpack

### [lessOptions](https://lesscss.org/usage/#command-line-usage-options)

- 描述: less 相关配置(内置了 less,不用额外下载)
- 类型: Record<string, any>
- 默认值: {javascriptEnabled: true}
- 兼容模式: vite 和 webpack

### [sassOptions](https://github.com/sass/node-sass)

- 描述: sass 相关配置(如果使用需自行下载 sass)
- 类型: Record<string, any>
- 默认值: {}
- 兼容模式: vite 和 webpack

### [stylusOptions](https://stylus-lang.com/docs/js.html)

- 描述: stylus 相关配置(如果使用需自行下载 stylus)
- 类型: Record<string, any>
- 默认值: {}
- 兼容模式: vite 和 webpack

### [styleLoaderOptions](https://www.npmjs.com/package/style-loader)

- 描述: style-loader 相关配置
- 类型: false | Record<string, any>
- 默认值: {base: 0, esModule: true}
- 兼容模式: webpack 模式 dev

### [cssLoaderModules](https://www.npmjs.com/package/style-loader)

- 描述: css-loader 的 modules 配置
- 类型: Record<string, any>
- 默认值: {localIdentName: '\[name]\_\_\[local]--\[hash:base64:8]'}
- 兼容模式: webpack

### [cssLoaderOptions](https://www.npmjs.com/package/style-loader)

- 描述: css-loader 配置
- 类型: Record<string, any>
- 默认值: {}
- 兼容模式: webpack

### [postcssPresetEnvOptions](https://www.npmjs.com/package/postcss-preset-env)

- 描述: postcss-preset-env 配置
- 类型: Record<string, any>
- 默认值: {stage: 3}
- 兼容模式: vite 和 webpack

### [autoprefixer](https://www.npmjs.com/package/postcss-preset-env)

- 描述: autoprefixer 配置
- 类型: Record<string, any>
- 默认值: {remove: false, flexbox: 'no-2009'}
- 兼容模式: vite 和 webpack

### extraPostCSSPlugins

- 描述: 额外的 postcss 插件
- 类型: any[]
- 默认值: undefined
- 兼容模式: vite 和 webpack

### [postcssOptions](https://postcss.org/)

- 描述: postcss 配置,内置了 postcss-flexbugs-fixes 和 postcss-preset-env 插件
- 类型: Record<string, any>
- 兼容模式: vite 和 webpack

## 其他配置

### nocompress

- 描述: 是否不压缩,开启后 jsMinifier 和 cssMinifier 相关配置不会生效
- 类型: boolean
- 默认值: false
- 兼容模式: webpack 模式 build
- 说明: 环境变量 COMPRESS='1'也可关闭压缩

### jsMinifier

- 描述: 构建时压缩 JavaScript 的工具
- 类型: 'terser' | 'esbuild' | 'none'
- 默认值: 'esbuild'
- 兼容模式: webpack 模式 build

### [jsMinifierOptions](https://www.npmjs.com/package/terser-webpack-plugin)

- 描述: terserOptions 配置
- 类型: EsbuildOptions | TerserOptions;
- 默认值: EsbuildOptions
- 兼容模式: webpack 模式 build
- TerserOptions 内置配置

```json
{
  "ecma": 2015,
  "keep_classnames": false,
  "keep_fnames": false,
  "compress": {
    "comparisons": false,
    "inline": 2
  },
  "format": {
    "comments": false,
    "ascii_only": true
  }
}
```

### cssMinifier

- 描述: 构建时压缩 css 的工具
- 类型: 'esbuild' | 'cssnano' | 'none'
- 默认值: 'esbuild'
- 兼容模式: webpack 模式 build

### [cssMinifierOptions](https://www.npmjs.com/package/css-minimizer-webpack-plugin)

- 描述: 压缩 css 配置
- 类型: EsbuildOptions | CssNanoOptions | Record<string, any>;
- 默认值: {}
- 兼容模式: webpack 模式 build

### [threadLoaderOptions](https://www.npmjs.com/package/thread-loader)

- 描述: 是否启用 thread-loader 加速
- 类型: Record<string, any>;
- 默认值: undefined(对象开启及设置)
- 兼容模式: webpack

### codeSplitting

- 描述: 拆包策略
- 类型: 'default' | 'depPerChunk' | 'granularChunks'
- 说明 1: default 对应 webpack 内置的 defaultVendors 和 default
- 说明 2: [depPerChunk](https://umijs.org/docs/api/config#codesplitting)
- 说明 3: [granularChunks](https://umijs.org/docs/api/config#codesplitting)
- 默认值: 'granularChunks'
- 兼容模式: webpack 模式 build

### sourcemap

- 描述: sourcemap 配置
- 默认值: dev 时 cheap-module-source-map,build 时 source-map
- 兼容模式: webpack

### [preloadOptions](https://www.npmjs.com/package/preload-webpack-plugin)

- 描述: preload 配置
- 类型: false | Record<string, any>
- 默认值: {rel: 'prefetch'}
- 兼容模式: webpack 模式 build

### [forkTsCheckerOptions](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)

- 描述: fork-ts-checker-webpack-plugin 配置
- 类型: false | Record<string, any>
- 默认值: {}
- 兼容模式: webpack

### [analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

- 描述: 是否开启 webpack-bundle-analyzer
- 类型: BundleAnalyzerPlugin.Options;
- 默认值: undefined(对象开启及设置)
- 兼容模式: webpack 模式 build
- 说明: 环境变量 ANALYZE='1'也可以开启

### analyzerPort

- 描述: webpack-bundle-analyzer 对应端口
- 类型: number
- 默认值: 8888
- 兼容模式: webpack 模式 build
- 说明: 环境变量 ANALYZE_PORT 也可以设置

### [manifestOptions](https://www.npmjs.com/package/webpack-manifest-plugin)

- 描述: webpack-manifest-plugin 配置
- 类型: ManifestPluginOptions
- 默认值: undefined(对象开启及设置)
- 兼容模式: webpack 模式 build

### ignoreMomentLocale

- 描述: 是否忽律 moment 的 local 文件
- 类型: boolean
- 默认值: true
- 兼容模式: webpack

### copy

- 描述: 额外复制的目录,默认会复制 publicDir 下的文件到 outputPath
- 类型: Array<{from: string; to: string;}> | string[]
- 默认值: []
- 兼容模式: webpack 模式 build

### [deadCode](https://www.npmjs.com/package/unused-webpack-plugin)

- 描述: unused-webpack-plugin 配置
- 类型: { directories?: string[]; exclude?: string[]; root?: string; }
- 默认值: undefined(对象开启及设置)
- 兼容模式: webpack 模式 build

### [htmlOption](https://www.npmjs.com/package/html-webpack-plugin)

- 描述: html-webpack-plugin 配置
- 类型: false | HtmlWebpackPlugin.Options
- 默认值

```js
const initOptions = {
  inject: true,
  cache: false,
  publicPath,
  template: path.resolve(publicDir, 'index.html'),
  minify: isProduction
    ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    : {},
};
```

- 兼容模式: webpack

### [vite](https://cn.vitejs.dev/config/)

- 描述: vite 配置
- 兼容模式: dev 下 vite

### chainWebpack

- 描述: 使用 chain-webpack 修改 webpack 配置
- 类型: [Config](https://www.npmjs.com/package/webpack-5-chain)

```ts
{
  chainWebpack?: (
    memo: Config,
    args: {
      env: keyof typeof Env;
      webpack: typeof webpack;
    },
  ) => void | Promise<void>;
}
```

- 默认值: undefined
- 兼容模式: webpack
