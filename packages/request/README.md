# @eliduty/request
![npm](https://img.shields.io/npm/dt/@eliduty/request) ![npm](https://img.shields.io/npm/v/@eliduty/request)

基于axios封装的请求库。

- 基于TypeScript，拥有更好的类型推断和代码提示。
- 基于Class封装支持多请求实例配置。
- 更加灵活的请求拦截器和响应拦截器。
- 支持响应结果转换器。
- 支持取消请求（默认开启），同时支持单个请求关闭取消请求。

## 安装

```shell
npm install @eliduty/request
// 或
yarn add @eliduty/request
// 或
pnpm install @eliduty/request
```

## 基本使用

```javascript
// 拦截器
const interceptors={
    
};
// 转换器
const transforms={
    
}
const request = new Request({
  baseURL:'/api',
  timeout: 10 * 1000,
  interceptors,
  transforms,
});
```

## 类型说明

#### 请求配置

请求配置继承于`AxiosRequestConfig`，除`AxiosRequestConfig`配置选项外，还支持以下配置：

```typescript
interface RequestConfig extends AxiosRequestConfig {
  /**拦截器 */
  interceptors?: RequestInterceptor;

  /**转换器 */
  transforms?: RequestTransform;

  /**忽略请求取消 */
  ignoreCancelToken?: boolean;
}
```

#### 响应结果

```typescript
type RequestResponse<T = unknown> = AxiosResponse<T>;
```

#### 拦截器类型说明

```typescript
interface RequestInterceptor {
  /**请求拦截器 */
  requestInterceptor?: (config: RequestConfig) => RequestConfig;

  /**请求错误拦截器 */
  requestInterceptorCatch?: (error: AxiosError) => Promise<any>;

  /**响应拦截器 */
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;

  /**响应错误拦截器 */
  responseInterceptorCatch?: (error: AxiosError) => Promise<any>;
}
```

#### 转换器类型说明

```typescript
interface RequestTransform {
  /**请求配置转换 */
  requestTransform?: (config: RequestConfig) => RequestConfig;

  /**响应结果转换 */
  responseTransform?: (response: AxiosResponse, config: RequestConfig) => any;

  /**响应错误转换 */
  responseTransformCatch?: <T = unknown>(error: AxiosError, config: RequestConfig) => Promise<T>;
}
```

## 其它说明

1. 在某些情况下业务失败，但请求返回的对应状态码为200，如若想在请求成功，但业务失败的情况下，通过Promise的catch来接受错误，可以在转换器`responseTransform`中`return`常量标识符`ERROR_CODE`来将结果传递出去,在catch中可以获得完整的请求响应结果。

   ```javascript
   import { ERROR_CODE } from '@eliduty/request';
   const transform={
     responseTransform({ data }, config) {
       const { result, error } = data;
       if (!error) {
         return result;
       } else {
         return ERROR_CODE; 
       }
     },
   }
   ```

2. 在默认情况下，该库默认开启了请求取消功能，如需自定义控制可通过请求配置参数`ignoreCancelToken`进行控制。

## 完整示例

```typescript
import Request, { ERROR_CODE } from '@eliduty/request';
import type { RequestInterceptor, RequestTransform, RequestResponse } from '@eliduty/request';

const interceptors: RequestInterceptor = {
  requestInterceptor: config => {
    //请求拦截器 
    config.headers = {
      ...config.headers,
      'Some-Header1': 'header info2',
    };
    return config;
  },
  responseInterceptorCatch: error => {
    const { response } = error;
    if (response) {
      // 非成功状态码
      return Promise.reject(response);
    } else {
      // 未联网
      // alert('网络异常，请检查网络连接');
      return Promise.reject(new Error('网络异常，请检查网络连接'));
    }
  },
};

const transform: RequestTransform = {
  requestTransform(config) {
    config.headers = {
      ...config.headers,
      'Some-Header2': 'header info2',
    };
    return config;
  },
  responseTransform({ data }: RequestResponse<Result>, config) {
    const { result, error } = data;
    if (!error) {
      return result;
    } else {
      return ERROR_CODE; 
    }
  },
   responseTransformCatch(err) {
     // 全局错误处理
     return Promise.reject(err);
   }
};

export interface Result<T = any> {
  error: number;
  message: string;
  result: T;
}

const request = new Request({
  baseURL:'/api',
  timeout: 10 * 1000,
  transforms,
  interceptors,
});

export default request;

```

