import { businessSuccessData } from '@mocks/request/data';
import { describe, expect, test } from 'vitest';
import { businessSucess } from './mock/api';

describe('请求库单元测试', () => {
  test('ERROR_CODE的值，应该为ERROR_CODE', async () => {
    expect(businessSucess()).resolves.toEqual(businessSuccessData);
    // networkError();
    // expect('__ERROR_CODE__').toBe('__ERROR_CODE__');
  });
});
