import type { UserConfig, ProxyOptions } from 'vite';
import { mergeConfig } from 'vite';
import { LOCAL_IDENT_NAME } from '../constants';
import type { ViteDevOptions } from '../types';
import { getProcessEnv } from '../utils/getProcessEnv';
import { getPlugins } from './getPlugins';
import { getEsBuildTarget } from '../utils';

export function config({
  env,
  userConfig,
  userEnv,
}: ViteDevOptions): UserConfig {
  const {
    host,
    port,
    define,
    publicPath,
    open,
    vite,
    alias,
    targets,
    inlineLimit,
    outputPath,
    proxy,
  } = userConfig;

  const defaultConfig: UserConfig = {
    define: {
      'process.env': getProcessEnv(userEnv, publicPath, env),
      ...define,
    },
    resolve: { alias },
    server: {
      host,
      port,
      open,
      proxy: proxy as Record<string, ProxyOptions>,
    },
    build: {
      commonjsOptions: { transformMixedEsModules: true },
      target: getEsBuildTarget(targets),
      assetsInlineLimit: inlineLimit,
      outDir: outputPath,
    },
    css: {
      devSourcemap: true,
      modules: {
        scopeBehaviour: 'local',
        generateScopedName: LOCAL_IDENT_NAME,
      },
      preprocessorOptions: { less: { javascriptEnabled: true }},
    },
    plugins: getPlugins({ userConfig }),
  };

  return mergeConfig(defaultConfig, vite);
}
