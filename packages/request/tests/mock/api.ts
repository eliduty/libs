import { get } from './request';
import { API_URL } from './url';

/**
 * 返回一个业务成功
 * @returns
 */
export const businessSuccess = () => get(API_URL.businessSuccess);

/**
 * 返回一个业务失败
 * @returns
 */
export const businessError = () => get(API_URL.businessError);

/**
 * 返回一个500 服务器内部错误
 * @returns
 */
export const internalServerError = () => get(API_URL.internalServerError);

/**
 * 返回一个401 未授权错误
 * @returns
 */
export const unauthorized = () => get(API_URL.unauthorized);

/**
 * 返回一个网络错误
 * @returns
 */
export const networkError = () => get(API_URL.networkError);
