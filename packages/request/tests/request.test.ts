import { businessErrorMockData, businessSuccessMockData } from '@/mocks/request/data';
import { describe, expect, test } from 'vitest';
import { businessError, businessSuccess, internalServerError, networkError, unauthorized } from './mock/api';

describe('请求库单元测试', () => {
  test('调用businessSuccess，应该返回成功的数据', () => {
    expect(businessSuccess()).resolves.toEqual(businessSuccessMockData.data);
  });

  test('调用businessError，应该返回失败的数据', () => {
    expect(businessError()).resolves.toEqual(businessErrorMockData);
  });

  test('调用internalServerError，应该返回500 internal server error', () => {
    expect(internalServerError()).rejects.toThrowErrorMatchingInlineSnapshot(`[AxiosError: Request failed with status code 500]`);
  });

  test('调用unauthorized，应该返回401 unauthorized', () => {
    expect(unauthorized()).rejects.toThrowErrorMatchingInlineSnapshot(`[AxiosError: Request failed with status code 401]`);
  });

  test('调用networkError，应该返回 network error', () => {
    expect(networkError()).rejects.toThrowErrorMatchingInlineSnapshot(`[AxiosError: Network Error]`);
  });
});
