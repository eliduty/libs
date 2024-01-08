import { businessErrorMockData, businessSuccessMockData } from '@/mocks/request/data';
import { HTTP_STATUS } from '@eliduty/request';
import { describe, expect, test } from 'vitest';
import { businessError, businessSuccess, internalServerError, networkError, unauthorized } from './mock/api';

describe('请求库单元测试', () => {
  test('调用businessSuccess，应该返回成功的数据', () => {
    expect(businessSuccess()).resolves.toEqual(businessSuccessMockData.data);
  });

  test('调用businessError，应该返回失败的数据', () => {
    expect(businessError()).resolves.toEqual(businessErrorMockData);
  });

  test('再次调用businessSuccess，应该返回一个请求被取消的异常', () => {
    expect(businessSuccess()).rejects.toThrowError(`请求取消`);
  });

  test('调用internalServerError，应该返回500 internal server error', () => {
    expect(internalServerError()).rejects.toThrowError(`服务器异常`);
  });

  test('调用unauthorized，应该返回401 unauthorized', () => {
    expect(unauthorized()).rejects.toThrowError(`未授权`);
  });

  test('调用networkError，应该返回 network error', () => {
    expect(networkError()).rejects.toThrowError(`网络异常，请检查网络连接`);
  });

  test('调用HTTP_STAUTS，应该返回所有的错误信息', () => {
    expect(HTTP_STATUS).toMatchInlineSnapshot(`
      {
        "400": "请求参数错误",
        "401": "未授权, 请重新登录",
        "403": "服务器拒绝本次访问",
        "404": "请求错误,未找到该资源",
        "405": "请求方法未允许",
        "408": "请求超时",
        "409": "请求发生冲突",
        "410": "请求的资源已删除",
        "413": "请求体过大，服务器无法处理",
        "414": "请求url过长",
        "415": "不支持的媒体类型",
        "429": "请求次数超过限制",
        "500": "服务器端内部错误",
        "501": "服务器不支持该请求中使用的方法",
        "502": "网络错误",
        "503": "服务不可用",
        "504": "网关超时",
        "505": "HTTP版本不受支持",
      }
    `);
  });
});
