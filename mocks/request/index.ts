import { http, HttpResponse } from 'msw';
import { businessSuccessData } from './data';
// const { VITE_PROXY_API_HOST, VITE_APP_API_ROOT } = import.meta.env;
// const get = (url: string, resolver) => http.get(`${VITE_PROXY_API_HOST}${VITE_APP_API_ROOT}${url}`, resolver);
const success = (data: unknown) => {
  return {
    code: 200,
    message: 'success',
    data
  };
};

export const restHandlers = [
  http.get('/users', () => {
    return HttpResponse.json(success(businessSuccessData));
  }),
  http.get('/network-error', () => {
    return HttpResponse.error();
  })
];

export default [...restHandlers];
