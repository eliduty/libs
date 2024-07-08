import Request, { HTTP_STATUS } from '@eliduty/request';

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
      config.headers.Authorization = 'string';
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

      console.log(HTTP_STATUS[response.status]);
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
