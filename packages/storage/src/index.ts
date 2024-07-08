/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2022-01-25 08:47:36
 * @LastEditors: eliduty
 * @LastEditTime: 2024-07-08 15:27:37
 * @Description:
 */

export interface EstorageOption {
  driver: Storage;
  prefix: string;
}
export interface EstorageConfig {
  //过期时间 单位秒
  expire?: number;
}
export interface EstorageData<T = unknown> {
  data: T;
  expire?: number;
}

export default class Estorage {
  private driver;
  private prefix;
  constructor(option: EstorageOption) {
    this.driver = option.driver || window.localStorage;
    this.prefix = option.prefix || '';
  }
  config(option: EstorageOption) {
    this.driver = option.driver || window.localStorage;
    this.prefix = option.prefix || '';
    return this;
  }
  get<T = unknown>(key: string) {
    key = this.getKey(key);
    const value = this.driver.getItem(key) || '';
    if (value) {
      const storageData = JSON.parse(value) as EstorageData<T>;
      const time = new Date().getTime();
      if (storageData.expire && time > storageData.expire) {
        this.remove(key);
        return null;
      } else {
        return storageData.data;
      }
    }
    return null;
  }
  set(key: string, data: unknown, config: EstorageConfig = {}) {
    key = this.getKey(key);
    const time = new Date().getTime();
    const value: EstorageData = {
      expire: config.expire ? time + config.expire * 1000 : undefined,
      data
    };
    this.driver.setItem(key, JSON.stringify(value));
  }
  remove(...keys: string[]) {
    keys.forEach(item => {
      this.driver.removeItem(this.getKey(item));
    });
  }
  clear() {
    this.driver.clear();
  }
  private getKey(key: string) {
    return this.prefix + key;
  }
}

const storage = new Estorage({ driver: localStorage, prefix: '' });
/**
 * 设置缓存
 * @param key 缓存标识
 * @param value 值
 */
export function setStorage(key: string, data: unknown, config: EstorageConfig = {}) {
  storage.set(key, data, config);
}
/**
 * 获取缓存
 * @param key 缓存标识
 */
export function getStorage(key: string) {
  return storage.get(key);
}
/**
 * 移除特定标识缓存
 * @param keys 缓存标识集合
 */
export function removeStorage(...keys: string[]) {
  storage.remove(...keys);
}
/**
 * 清除所有缓存
 */
export function clearStorage() {
  storage.clear();
}
