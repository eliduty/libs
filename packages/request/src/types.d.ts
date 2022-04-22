import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestInterceptor {
  /**
   * 请求拦截器
   */
  requestInterceptor?: (config: RequestConfig) => RequestConfig;

  /**
   * 请求错误拦截器
   */
  requestInterceptorCatch?: (error: AxiosError) => Promise<any>;

  /**
   * 响应拦截器
   */
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;

  /**
   * 响应错误拦截器
   */
  responseInterceptorCatch?: (error: AxiosError) => Promise<any>;
}

export interface RequestTransform {
  /**
   *  请求配置转换
   */
  requestTransform?: (config: RequestConfig) => RequestConfig;

  /**
   * 响应结果转换
   */
  responseTransform?: (response: AxiosResponse, config: RequestConfig) => any;

  /**
   * 响应错误转换
   */
  responseTransformCatch?: <T = unknown>(error: AxiosError, config: RequestConfig) => Promise<T>;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptor;
  transform?: RequestTransform;
  ignoreCancelToken?: boolean;
}

export type RequestResponse<T = unknown> = AxiosResponse<T>;
