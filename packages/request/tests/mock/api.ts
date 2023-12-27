import { get } from './request';

/**
 * 返回一个业务成功
 * @returns
 */
export const businessSucess = () => get('/business-success');

/**
 * 返回一个业务失败
 * @returns
 */
export const businessError = () => get('/business-error');

/**
 * 返回一个500 服务器内部错误
 * @returns
 */
export const internalServerError = () => get('/internal-server-error');

/**
 * 返回一个401 未授权错误
 * @returns
 */
export const unauthorized = () => get('/unauthorized');

/**
 * 返回一个网络错误
 * @returns
 */
export const networkError = () => get('/network-error');
