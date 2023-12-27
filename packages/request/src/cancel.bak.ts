import { isFunction } from '@eliduty/type';
import type { Canceler } from 'axios';
import axios from 'axios';
import type { RequestConfig } from './index.bak';

export const generatePendingKey = (config: RequestConfig) => [config.method, config.url].join('&');

export class Cancel {
  private pendingMap: Map<string, Canceler>;
  constructor() {
    this.pendingMap = new Map();
  }
  /**
   * 添加请求
   * @param {*} config
   */
  add(config: RequestConfig) {
    this.remove(config);
    const pendingKey = generatePendingKey(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!this.pendingMap.has(pendingKey)) this.pendingMap.set(pendingKey, cancel);
      });
  }
  /**
   * 移除请求
   * @param {*} config
   */
  remove(config: RequestConfig) {
    const pendingKey = generatePendingKey(config);
    if (this.pendingMap.has(pendingKey)) {
      const cancel = this.pendingMap.get(pendingKey);
      cancel && isFunction(cancel) && cancel();
      this.pendingMap.delete(pendingKey);
    }
  }
  /**
   * 清除请求
   */
  clear() {
    this.pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel();
    });
    this.pendingMap.clear();
  }
  /**
   * 重置
   */
  reset() {
    this.pendingMap = new Map();
  }
}
