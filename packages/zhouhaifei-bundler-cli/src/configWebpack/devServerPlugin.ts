import type { WebpackApplyOptions } from '../types';
import path from 'path';

export function devServerPlugin({
  userConfig: {
    proxy,
    port,
    host,
    publicPath,
    publicDir,
  },
  isDevelopment,
  config,
  cwd,
}: WebpackApplyOptions) {
  if (!isDevelopment) {
    return;
  }

  config.devServer
    .proxy(proxy)
    .open(false)
    .hot(true)
    .allowedHosts
    .add('all')
    .end()
    .compress(true)
    .headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': [
        'GET',
        'HEAD',
        'PUT',
        'POST',
        'PATCH',
        'DELETE',
        'OPTIONS',
      ].join(', '),
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
    })
    .set('client', {
      logging: 'none',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: false,
    })
    .host(host)
    .port(port)
    .historyApiFallback({ disableDotRule: true })
    .set('devMiddleware', { publicPath })
    .set('static', {
      directory: path.resolve(cwd, publicDir),
      publicPath,
      watch: { aggregateTimeout: 600 },
    });
}
