/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2021-03-03 15:57:53
 * @LastEditors: eliduty
 * @LastEditTime: 2022-01-14 20:41:35
 * @Description:
 */

const Storage = localStorage; // 配置使用的存储器驱动

export interface StorageConfig {
  //过期时间 单位秒
  expire?: number;
}
export interface StorageData {
  data: unknown;
  expire?: number;
}

/**
 * 设置缓存
 * @param key 缓存标识
 * @param value 值
 */
export function setStorage(key: string, data: unknown, config: StorageConfig = {}): void {
  const time = new Date().getTime();
  const value = { expire: config.expire ? time + config.expire * 1000 : undefined, data } as StorageData;
  Storage.setItem(key, JSON.stringify(value));
}
/**
 * 获取缓存
 * @param key 缓存标识
 */
export function getStorage(key: string): unknown {
  let value = Storage.getItem(key) || '';
  if (value) {
    let storageData = JSON.parse(value) as StorageData;
    const time = new Date().getTime();
    if (storageData.expire && time <= storageData.expire) {
      return storageData.data;
    } else {
      removeStorage(key);
    }
  }
  return '';
}
/**
 * 移除特定标识缓存
 * @param keys 缓存标识集合
 */
export function removeStorage(...keys: string[]): void {
  keys.forEach(item => Storage.removeItem(item));
}
/**
 * 清楚所有缓存
 */
export function clearStorage(): void {
  Storage.clear();
}
/**
 * 获取指定索引的key
 * @param index 索引
 */
export function keyStorage(index: number): unknown {
  return Storage.key(index);
}
