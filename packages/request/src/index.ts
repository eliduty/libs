// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import rawRequest from 'axios';

import type { AxiosError, AxiosInstance, AxiosInterceptorOptions, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * 原始axios请求
 */
export const axios = rawRequest;

/**
 * 拦截器配置
 */
interface RequestInterceptors<D = any, R = any> {
  /**
   * 请求成功拦截器
   * @param config
   * @returns
   */
  requestInterceptor?: (config: InternalAxiosRequestConfig<D>) => InternalAxiosRequestConfig<D> | Promise<InternalAxiosRequestConfig<D>>;
  /**
   * 请求失败拦截器
   * @param err
   * @returns
   */
  requestInterceptorCatch?: (err: any) => any;
  /**
   * 请求拦截器配置
   */
  requestInterceptorOption?: AxiosInterceptorOptions;

  /**
   * 响应拦截器配置
   * @param response
   * @returns
   */
  responseInterceptor?: <T extends R = R>(response: AxiosResponse<T, R>) => any;

  /**
   * 响应失败拦截器配置
   * @param err
   * @returns
   */
  responseInterceptorCatch?: (err: AxiosError<R>) => any;

  /**
   * 响应拦截器
   */
  responseInterceptorOption?: AxiosInterceptorOptions;
}

/**
 * 自定义请求参数
 */
export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * 忽略重复请求功能：
   * 可以在实例配置，也可以单独在接口开启
   */
  ignoreDuplicateRequest?: boolean;

  /**
   * 设置在多长时间内不允许发送重复请求
   * 可以在实例配置，也可以单独在接口开启
   */
  cancelPendingTime?: number;

  /**
   * 指定当前请求的key，
   * 如果传递该参数，则会覆盖generateRequestKey生成的key
   * */
  requestUniqueKey?: string;
}

interface InstanceRequestConfig<D = any, R = any> extends Omit<RequestConfig<D>, 'requestUniqueKey'> {
  /**
   * 拦截器配置：
   * 请求拦截及配置：requestInterceptor、requestInterceptorCatch、requestInterceptorOption
   * 相应拦截及配置：responseInterceptor、responseInterceptorCatch、responseInterceptorOption
   */
  interceptors?: RequestInterceptors<D, R>;

  /**
   * 创建请求创建唯一标识，重复请求用此作区分, 默认基于url、method、参数生成
   * 在实例设置时
   * @param requestConfig
   * @returns
   */
  generateRequestKey?: (config: AxiosRequestConfig) => string;
}

/**
 * 1. 支持取消请求（默认开启），同时支持单个请求关闭取消请求
 * 2. 基于Class封装支持多请求实例配置
 * 3. 更加灵活的请求拦截器和响应拦截器
 * 4. 更好的类型推断和代码提示
 * 5. 支持响应结果转换器
 */
export default class Request<R = any, D = any> {
  private static interceptors: RequestInterceptors;
  private instance: AxiosInstance;
  private config: InstanceRequestConfig<D, R>;
  private pendingRequests: Map<string, AbortController> = new Map();

  constructor(config: InstanceRequestConfig<D, R>) {
    this.config = config;
    this.instance = axios.create(config);
    this.setInterceptors();
    config.generateRequestKey && (this.generateRequestKey = config.generateRequestKey);
  }

  /**
   * 创建请求唯一标识，重复请求用此作区分, 默认基于url、method、参数生成
   * 在实例设置时
   * @param RequestConfig
   * @returns
   */
  private generateRequestKey({ method = '', url = '', params = '', data = '' }: RequestConfig) {
    return JSON.stringify({
      method,
      url,
      params,
      data
    });
  }

  /**
   * 设置拦截器
   */
  private setInterceptors() {
    const classInterceptors = Request.interceptors;
    const instanceInterceptors = this.config.interceptors;
    // 全局前置拦截器
    this.instance.interceptors.request.use(classInterceptors?.requestInterceptor, classInterceptors?.requestInterceptorCatch, instanceInterceptors?.requestInterceptorOption);
    // 实例前置拦截器
    this.instance.interceptors.request.use(instanceInterceptors?.requestInterceptor, instanceInterceptors?.requestInterceptorCatch, instanceInterceptors?.requestInterceptorOption);
    // 全局后置拦截器
    this.instance.interceptors.response.use(classInterceptors?.responseInterceptor, classInterceptors?.responseInterceptorCatch, classInterceptors?.responseInterceptorOption);
    // 实例后置拦截器
    this.instance.interceptors.response.use(instanceInterceptors?.responseInterceptor, instanceInterceptors?.responseInterceptorCatch, instanceInterceptors?.responseInterceptorOption);
  }

  /**
   * 获取请求
   * @returns
   */
  getInstance() {
    return this.instance;
  }

  /**
   * 设置全局类拦截器
   * @param interceptors
   */
  static setInterceptors<DATA = any, RES = any>(interceptors: RequestInterceptors<DATA, RES>) {
    Request.interceptors = interceptors;
  }

  /**
   * 获取配置的拦截器
   * 包含全局拦截器和实例拦截器
   */
  getInterceptors() {
    return {
      classInterceptors: Request.interceptors,
      instanceInterceptors: this.config.interceptors
    };
  }

  /**
   * 移除拦截器
   * @param interceptorNumber
   */
  removeInterceptors(interceptorNumber: number) {
    this.instance.interceptors.request.eject(interceptorNumber);
  }

  /**
   * 清除拦截器
   * @param type
   */
  clearInterceptors(type: 'request' | 'response' | 'all' = 'all') {
    if (type === 'request') {
      this.instance.interceptors.request.clear();
    } else if (type === 'response') {
      this.instance.interceptors.response.clear();
    } else {
      this.instance.interceptors.request.clear();
      this.instance.interceptors.response.clear();
    }
  }

  /**
   * 用来改变request默认的header配置，不要在拦截器中使用
   * @param {*} headers
   * @returns
   */
  setHeader(headers: Partial<AxiosRequestHeaders>) {
    this.instance?.defaults?.headers && Object.assign(this.instance.defaults.headers, headers);
  }

  /**
   * 生成唯一的请求Key
   * @param config
   * @returns
   */
  private generUniqueRequestKey(config: RequestConfig) {
    if (config.requestUniqueKey) return config.requestUniqueKey;
    return this.generateRequestKey(config);
  }

  /**
   * 添加请求到列表
   * @param config
   * @param controller
   */
  private addPendingRequest(config: RequestConfig, controller: AbortController) {
    const key = this.generUniqueRequestKey(config);
    this.pendingRequests.has(key) ? controller.abort('请求被取消,config:' + config) : this.pendingRequests.set(key, controller);
  }

  /**
   * 从列表中移除请求
   * @param config
   */
  private removePendingRequest(config: RequestConfig) {
    const key = this.generUniqueRequestKey(config);
    setTimeout(() => this.pendingRequests.delete(key), 0);
  }

  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    this.pendingRequests.forEach(item => item.abort());
  }

  /**
   * 取消请求
   * @param config
   * @returns
   */
  cancelRequest(config: RequestConfig) {
    const key = this.generUniqueRequestKey(config);
    const controller = this.pendingRequests.get(key);
    return controller?.abort();
  }

  /**
   * 请求
   * @param config
   * @returns
   */
  request<RES = R, DATA = D>(config: RequestConfig<DATA>) {
    // 如果开启了取消重复请求
    if (this.config.ignoreDuplicateRequest || config.ignoreDuplicateRequest) {
      const controller = new AbortController();
      config.signal = controller.signal;
      this.addPendingRequest(config, controller);
      const cancelPendingTime = this.config.cancelPendingTime || config.cancelPendingTime;
      cancelPendingTime && setTimeout(() => this.removePendingRequest(config), cancelPendingTime);
      return this.instance.request<RES, RES extends R ? R : RES, DATA>(config).finally(() => {
        this.removePendingRequest(config);
      });
    }
    return this.instance.request<RES, RES extends R ? R : RES, DATA>(config);
  }

  /**
   * get
   * @param url
   * @param params
   * @param config
   * @returns
   */
  get<RES = R, DATA = D>(url: string, params: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'get',
      url,
      params,
      ...config
    });
  }

  /**
   * post
   * @param url
   * @param data
   * @param config
   * @returns
   */
  post<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'post',
      url,
      data,
      ...config
    });
  }

  /**
   * put
   * @param url
   * @param data
   * @param config
   * @returns
   */
  put<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'put',
      url,
      data,
      ...config
    });
  }

  /**
   * patch
   * @param url
   * @param data
   * @param config
   * @returns
   */
  patch<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'patch',
      url,
      data,
      ...config
    });
  }

  /**
   * delete
   * @param url
   * @param data
   * @param config
   * @returns
   */
  delete<RES = R, DATA = D>(url: string, data: any = {}, config: RequestConfig<DATA> = {}) {
    return this.request<RES, DATA>({
      method: 'delete',
      url,
      data,
      ...config
    });
  }
}
