import { API_URL } from '@/packages/request/tests/mock/url';
import { http, HttpResponse } from 'msw';
import { businessErrorMockData, businessSuccessMockData } from './data';
// const { VITE_PROXY_API_HOST, VITE_APP_API_ROOT } = import.meta.env;
// const get = (url: string, resolver) => http.get(`${VITE_PROXY_API_HOST}${VITE_APP_API_ROOT}${url}`, resolver);

export const restHandlers = [
  http.get(API_URL.businessSuccess, () => {
    return HttpResponse.json(businessSuccessMockData);
  }),

  http.get(API_URL.businessError, () => {
    return HttpResponse.json(businessErrorMockData);
  }),

  http.get(API_URL.internalServerError, () => {
    return new HttpResponse(null, { status: 500 });
  }),

  http.get(API_URL.unauthorized, () => {
    return new HttpResponse(null, { status: 401 });
  }),

  http.get(API_URL.networkError, () => {
    return HttpResponse.error();
  })
];

export default [...restHandlers];
