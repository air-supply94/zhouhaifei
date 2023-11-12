import fs from 'fs';
import path from 'path';

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
    corejs?: { version: string; proposals: boolean; };
    configPath?: string;
    ignoreBrowserslistConfig?: boolean;
    browserslistEnv?: string;
    shippedProposals?: boolean;
  };
  babelPresetReact?: false | {
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
  babelPluginTransformRuntime?: false | {
    corejs?: false | 2 | 3 | { version: 2 | 3; proposals: boolean; };
    helpers?: boolean;
    regenerator?: boolean;
    absoluteRuntime?: string | boolean;
    version?: string;
  };
  babelPluginDecorators?: false | {
    version?: '2023-05' | '2023-01' | '2022-03' | '2021-12' | '2018-09' | 'legacy';
    decoratorsBeforeExport?: boolean;
  };
  babelClassProperties?: { loose?: boolean; };
  babelPluginStyledComponents?: Record<string, any>;
}

export function getBabelConfig({
  babelExtraPreset,
  babelExtraPlugins,
  babelPresetEnv,
  babelPresetReact,
  babelPresetTypeScript,
  babelPluginTransformRuntime,
  babelPluginDecorators,
  babelClassProperties,
  babelPluginStyledComponents,
}: GetBabelConfigOptions = {}) {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
    .toString());
  const coreJsVersion = packageJson.dependencies['core-js'];
  const runtimeVersion = packageJson.dependencies['@babel/runtime'];

  return {
    presets: [
      // preset-env
      [
        require.resolve('@babel/preset-env'),
        {
          bugfixes: true,
          loose: true,

          // 保留 es modules 语法,交给 webpack 处理
          modules: false,
          debug: false,
          useBuiltIns: 'usage',
          corejs: {
            version: coreJsVersion,
            proposals: true,
          },
          ignoreBrowserslistConfig: true,
          ...babelPresetEnv,
        } as GetBabelConfigOptions['babelPresetEnv'],
      ],

      // 转换jsx语法
      babelPresetReact !== false && [
        require.resolve('@babel/preset-react'),
        {
          runtime: 'automatic',
          development: process.env.NODE_ENV === 'development',
          ...babelPresetReact,
        } as GetBabelConfigOptions['babelPresetReact'],
      ],

      // 转换ts语法
      [
        require.resolve('@babel/preset-typescript'),
        {
          allowNamespaces: true,
          allowDeclareFields: true,
          onlyRemoveTypeImports: false,
          optimizeConstEnums: true,
          ...babelPresetTypeScript,
        } as GetBabelConfigOptions['babelPresetTypeScript'],
      ],
    ].concat(babelExtraPreset)
      .filter(Boolean),
    plugins: [
      // 支持styled-components
      babelPluginStyledComponents && [
        require.resolve('@babel-plugin-styled-components'),
        babelPluginDecorators,
      ],

      // 支持装饰器语法
      babelPluginDecorators !== false && [
        require.resolve('@babel/plugin-proposal-decorators'),
        {
          version: 'legacy',
          ...babelPluginDecorators,
        } as GetBabelConfigOptions['babelPluginDecorators'],
      ],

      // preset-env内置了下面插件,webpack打包不需要下面插件
      // vite dev使用esbuild打包,不需要preset和transform-runtime,需要下面插件
      babelClassProperties && [
        require.resolve('@babel/plugin-proposal-class-properties'),
        {
          loose: true,
          ...babelClassProperties,
        } as GetBabelConfigOptions['babelClassProperties'],
      ],
      babelClassProperties && [
        require.resolve('@babel/plugin-proposal-private-methods'),
        {
          loose: true,
          ...babelClassProperties,
        } as GetBabelConfigOptions['babelClassProperties'],
      ],
      babelClassProperties && [
        require.resolve('@babel/plugin-proposal-private-property-in-object'),
        {
          loose: true,
          ...babelClassProperties,
        } as GetBabelConfigOptions['babelClassProperties'],
      ],

      // do-expressions
      require.resolve('@babel/plugin-proposal-do-expressions'),

      // duplicate-named-capturing-groups-regex
      require.resolve('@babel/plugin-proposal-duplicate-named-capturing-groups-regex'),

      // 支持 export v from 'mod'语法
      require.resolve('@babel/plugin-proposal-export-default-from'),

      // function-bind
      require.resolve('@babel/plugin-proposal-function-bind'),

      // function-sent
      require.resolve('@babel/plugin-proposal-function-sent'),

      // partial-application
      require.resolve('@babel/plugin-proposal-partial-application'),

      // pipeline-operator
      [
        require.resolve('@babel/plugin-proposal-pipeline-operator'),
        { proposal: 'minimal' },
      ],

      // throw-expressions
      require.resolve('@babel/plugin-proposal-throw-expressions'),

      // record-and-tuple
      require.resolve('@babel/plugin-proposal-record-and-tuple'),

      // transform-runtime
      babelPluginTransformRuntime !== false && [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: true,
          regenerator: true,
          absoluteRuntime: path.dirname(require.resolve('../package.json')),
          version: runtimeVersion,
          ...babelPluginTransformRuntime,
        } as GetBabelConfigOptions['babelPluginTransformRuntime'],
      ],
    ].concat(babelExtraPlugins)
      .filter(Boolean),
  };
}
