import Request from '@eliduty/request';
// const { VITE_APP_API_ROOT: baseURL } = import.meta.env;

interface IResponse {
  code: number;
  message: number;
  data: any;
}

const request = new Request<IResponse>({
  timeout: 30000,
  baseURL: '',
  interceptors: {
    requestInterceptor(config) {
      config.headers['App-Version'] = Date.now();
      config.headers['Authorization'] = 'string';
      return config;
    },
    responseInterceptor({ data }) {
      if (data.code === 200) {
        return Promise.resolve(data.data);
      } else {
        return Promise.resolve(data);
      }
    }
  }
});

export const get = request.get.bind(request);
export const post = request.post.bind(request);
export const put = request.put.bind(request);
export const patch = request.patch.bind(request);
export const del = request.delete.bind(request);

export default request;
