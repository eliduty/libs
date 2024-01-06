# @eliduty/request

![npm](https://img.shields.io/npm/dt/@eliduty/request) ![npm](https://img.shields.io/npm/v/@eliduty/request)

基于axios封装的请求库。

- 基于TypeScript，拥有更好的类型推断和代码提示。
- 基于Class封装支持多请求实例配置。
- 更加灵活的请求拦截器和响应拦截器。
- 支持响应结果转换器。
- 支持实例配置取消重复请求（默认开启），同时支持单个请求关闭。

## 安装

```shell
npm install @eliduty/request
// 或
yarn add @eliduty/request
// 或
pnpm install @eliduty/request
```

## 基本使用

```typescript
import Request from '@eliduty/request';
const request = new Request({
  baseURL:'/api',
  timeout: 10 * 1000,
  // 拦截器配置
  interceptors:{

  },
  // 生成请求KEY方法，可选
  generateRequestKey(config){
    return KEY
  }
});
```

该工具库也导出了原始axios请求实例和HTTP状态码字典，使用方式如下：

```typescript
import {axios,HTTP_STATUS} from '@eliduty/request';
```

`HTTP_STATUS` 字典如下：

```typescript
{
  400: '请求参数错误',
  401: '未授权, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  409: '请求发生冲突',
  410: '请求的资源已删除',
  413: '请求体过大，服务器无法处理',
  414: '请求url过长',
  415: '不支持的媒体类型',
  429: '请求次数超过限制',
  500: '服务器端内部错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网络错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}
```

## 类型说明

### 请求配置

请求配置继承于`AxiosRequestConfig`，除`AxiosRequestConfig`配置选项外，还支持以下配置：

```typescript
/**
 * 自定义请求参数
 */
export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * 忽略终止重复请求,默认：false
   * 可以在实例配置，也可以单独在接口开启
   */
  ignoreAbortRequest?: boolean;

  /**
   * 设置在请求未响应之前，多长时间内不允许发送相同请求
   * 可以在实例配置，也可以单独在接口开启
   */
  abortPendingTime?: number;

  /**
   * 指定当前请求的key，
   * 如果传递该参数，则会覆盖generateRequestKey生成的key
   * */
  requestUniqueKey?: string;
}
```

### 拦截器类型说明

```typescript
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
```

## 其它说明

1. 在默认情况下，该库默认开启了请求取消功能，如需自定义控制可通过请求配置参数`ignoreAbortRequest`进行控制。

## 完整示例

```typescript
import Request from '@eliduty/request';

interface ResponseType {
  code: number;
  message: number;
  data: any;
}

const request = new Request<ResponseType>({
  timeout: 30000,
  baseURL: '',
  interceptors: {
    requestInterceptor(config) {
      config.headers['App-Version'] = 'v0.1.0';
      config.headers['Authorization'] = 'string';
      config.headers['Some-Header-Key'] = 'Some-Header-Value';
      return config;
    },
    requestInterceptorCatch(err) {
      console.log('requestInterceptorCatch', err);
      return err;
    },
    responseInterceptor({ data }) {
      if (data.code === 200) {
        return Promise.resolve(data.data);
      } else {
        return Promise.resolve(data);
      }
    },

    responseInterceptorCatch(error) {
      const { response, code } = error;
      if (code === 'ERR_CANCELED') return Promise.reject(new Error('请求取消'));

      if (!response) return Promise.reject(new Error('网络异常，请检查网络连接'));

      if (response.status === 401) {
        // console.log('请求配置', config);
        return Promise.reject(new Error('未授权'));
      }

      if (response.status === 500) {
        return Promise.reject(new Error('服务器异常'));
      }

      // 其它情况处理

      return Promise.reject(response);
    }
  }
});

export const get = request.get.bind(request);
export const post = request.post.bind(request);
export const put = request.put.bind(request);
export const patch = request.patch.bind(request);
export const del = request.delete.bind(request);

export default request;

```

## 迁移指南

1. 取消请求参数由`ignoreCancelToken`变成了`ignoreAbortRequest`。
