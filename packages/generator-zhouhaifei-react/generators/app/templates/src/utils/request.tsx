import { message } from 'antd';
import type { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import axios from 'axios';

export const singleton = (function() {
  let instance: AxiosInstance;

  function init() {
    const axiosInstance: AxiosInstance = axios.create({
      // 30s超时限制
      timeout: 1000 * 30,
      timeoutErrorMessage: '请求超时',
      withCredentials: true,

      // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json',
    });

    axiosInstance
      .interceptors
      .request
      .use((config) => {
        config.headers = { ...config.headers };
        return config;
      }, (error: AxiosError) => {
        message.error(error?.message ?? '请求失败');
        return Promise.reject(error);
      });

    axiosInstance
      .interceptors
      .response
      .use(undefined, (error: AxiosError) => {
        if (!axios.isCancel(error)) {
          message.error(error.message || '请求失败');
        }

        return Promise.reject(error);
      });

    axiosInstance
      .interceptors
      .response
      .use(responseBaseInterceptors, undefined);

    function responseBaseInterceptors(info: AxiosResponse) {
      return info;
    }

    return axiosInstance;
  }

  return {
    getInstance(): AxiosInstance {
      if (instance) {
        return instance;
      } else {
        instance = init();
        return instance;
      }
    },
  };
}());

export function request<T = unknown>(options: AxiosRequestConfig = {}): Promise<T> {
  return singleton.getInstance()
    .request<T>(options)
    .then((info) => info.data);
}
