import type { UserConfig } from '@zhouhaifei/bundler-cli';

const target = 'https://cdtestcloudwms.ejingling.cn/';
const context = [
  '/api',
  '/sku',
  '/employee',
  '/category',
  '/baseSerializeSchema',
  '/brand',
  '/base',
  '/shop',
  '/warehouse',
  '/courier',
  '/city',
  '/district',
  '/province',
  '/organization',
  '/oms',
  '/basecommon',
  '/courier',
  '/productQuery',
  '/custom',
  '/address_courier',
  '/product',
  '/logRequest',
  '/skuQuery',
  '/accessLog',
  '/serial_number',
  '/fms',
  '/ejl-erp-oms',
  '/ejl-erp-wms',
  '/ejl-erp-oms-static',
  '/ejl-erp-wms-static',
  '/aftersale',
  '/warehouse_bin',
  '/warehouseShelf',
  '/eshop',
  '/page',
  '/static',
  '/logout',
  '/cw-ejl-erp-wms',
  '/ejl-pms',
  '/ejl-pos',
];
const proxy = context.reduce((prev, current) => {
  prev[current] = {
    target,
    changeOrigin: true,
    secure: false,
  };
  return prev;
}, {});

const config: UserConfig = {
  proxy,
  antd: { import: true },
  externals: {
    lodash: '_',
    qs: 'Qs',
    axios: 'axios',
    react: 'React',
    'react-dom': 'ReactDOM',
    mobx: 'mobx',
    'mobx-react': 'mobxReact',
    'mobx-react-lite': 'mobxReactLite',
    moment: 'moment',
  },
};
export default config;
