import rawRequest from 'axios';
import { Cancel } from './cancel';
import { isFunction } from '@eliduty/type';
import type { AxiosInstance, AxiosRequestHeaders, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
/** 原始axios请求 */
export const axios = rawRequest;

export const ERROR_CODE = '__ERROR_CODE__'; //错误固定标志位

export default class Request {
  private instance: RequestInstance;
  private options: RequestConfig;

  constructor(options: RequestConfig) {
    this.options = options;
    this.instance = this.create(options);
    this.setInterceptors();
  }
  /**
   * 创建请求实例
   * @param {RequestConfig} options  请求配置
   */
  create(options: RequestConfig) {
    return axios.create(options);
  }
  /**
   * @returns 请求实例
   */
  getInstance() {
    return this.instance;
  }
  /**
   * @returns {Object} 请求拦截器
   */
  getInterceptors() {
    return this.options.interceptors;
  }

  /**
   * 设置请求头
   * @param {*} header
   * @returns
   */
  setHeader(header: RequestHeaders) {
    if (!this.instance) return;
    Object.assign(this.instance.defaults.headers, header);
  }

  /**
   * 设置请求拦截器
   */
  setInterceptors() {
    const interceptor = this.getInterceptors();
    const canceler = new Cancel();
    // 设置请求成功拦截器
    this.instance.interceptors.request.use((config: RequestConfig) => {
      const { ignoreCancelToken = false } = config;
      if (!ignoreCancelToken) canceler.add(config);
      if (interceptor?.requestInterceptor && isFunction(interceptor.requestInterceptor)) config = interceptor.requestInterceptor(config);
      return config;
    }, undefined);
    // 设置请求失败拦截器
    if (interceptor?.requestInterceptorCatch && isFunction(interceptor.requestInterceptorCatch)) this.instance.interceptors.request.use(undefined, interceptor.requestInterceptorCatch);
    // 设置响应成功拦截器
    this.instance.interceptors.response.use(res => {
      res && canceler.remove(res.config);
      if (interceptor?.responseInterceptor && isFunction(interceptor.responseInterceptor)) res = interceptor.responseInterceptor(res);
      return res;
    }, undefined);
    // 设置响应失败拦截器
    if (interceptor?.responseInterceptorCatch && isFunction(interceptor.responseInterceptorCatch)) this.instance.interceptors.response.use(undefined, interceptor.responseInterceptorCatch);
  }
  /**
   * 发送请求
   * @param config
   * @returns
   */
  request<T = unknown>(config: RequestConfig): Promise<T> {
    let options = Object.assign({}, this.options, config);
    if (options.transforms?.requestTransform) {
      options = options.transforms.requestTransform(options);
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<T>(options)
        .then(res => {
          // 在网络错误的时候没有data
          if (res?.data && options.transforms?.responseTransform) {
            // 如果有返回数据，并且有返回数据转换函数
            const transformResult = options.transforms.responseTransform(res, options);
            transformResult === ERROR_CODE ? reject(res.data) : resolve(transformResult);
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((err: RequestResponseError) => {
          if (options.transforms?.responseTransformCatch) reject(options.transforms.responseTransformCatch(err, options));
          reject(err);
        });
    });
  }

  get<T = unknown>(url: string, params?: unknown, config?: RequestConfig) {
    return this.request<T>({ method: RequestMethod.GET, url, params, ...config });
  }

  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>({ method: RequestMethod.POST, url, data, ...config });
  }

  put<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>({ method: RequestMethod.PUT, url, data, ...config });
  }

  delete<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>({ method: RequestMethod.DELETE, url, data, ...config });
  }

  patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>({ method: RequestMethod.PATCH, url, data, ...config });
  }
}

export interface RequestInterceptor {
  /**请求拦截器 */
  requestInterceptor?: <D = any>(config: RequestConfig<D>) => RequestConfig<D>;

  /**请求错误拦截器 */
  requestInterceptorCatch?: <T = any, D = any>(error: RequestResponseError<T, D>) => Promise<any>;

  /**响应拦截器 */
  responseInterceptor?: <T = any, D = any>(response: RequestResponse<T, D>) => RequestResponse;

  /**响应错误拦截器 */
  responseInterceptorCatch?: <T = any, D = any>(error: RequestResponseError<T, D>) => Promise<any>;
}

export interface RequestTransform {
  /**请求配置转换 */
  requestTransform?: <D = any>(config: RequestConfig<D>) => RequestConfig;

  /**响应结果转换 */
  responseTransform?: <T = any, D = any>(response: RequestResponse<T, D>, config: RequestConfig) => any;

  /**响应错误转换 */
  responseTransformCatch?: <T = any, D = any>(error: RequestResponseError<T, D>, config: RequestConfig) => Promise<T>;
}

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**拦截器 */
  interceptors?: RequestInterceptor;

  /**转换器 */
  transforms?: RequestTransform;

  /**忽略请求取消 */
  ignoreCancelToken?: boolean;
}
/** 请求实例 */
export type RequestInstance = AxiosInstance;

/** 请求头 */
export type RequestHeaders = AxiosRequestHeaders;

/** 响应结果类型 */
export type RequestResponse<T = any, D = any> = AxiosResponse<T, D>;

/** 响应错误类型 */
export type RequestResponseError<T = any, D = any> = AxiosError<T, D>;
