/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2022-01-25 08:47:36
 * @LastEditors: eliduty
 * @LastEditTime: 2022-02-11 20:47:54
 * @Description:
 */

export interface StorageOption {
  driver: Storage;
  prefix: string;
}
export interface StorageConfig {
  //过期时间 单位秒
  expire?: number;
}
export interface StorageData {
  data: unknown;
  expire?: number;
}

export default class xStorage {
  private driver;
  private prefix;
  constructor(option: StorageOption) {
    this.driver = option.driver || window.localStorage;
    this.prefix = option.prefix || '';
  }
  config(option: StorageOption) {
    this.driver = option.driver || window.localStorage;
    this.prefix = option.prefix || '';
    return this;
  }
  get(key: string) {
    key = this.getKey(key);
    let value = this.driver.getItem(key) || '';
    if (value) {
      let storageData = JSON.parse(value) as StorageData;
      const time = new Date().getTime();
      if (storageData.expire && time <= storageData.expire) {
        return storageData.data;
      } else {
        this.remove(key);
      }
    }
    return '';
  }
  set(key: string, data: unknown, config: StorageConfig = {}) {
    key = this.getKey(key);
    const time = new Date().getTime();
    const value = { expire: config.expire ? time + config.expire * 1000 : undefined, data } as StorageData;
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

const defaultDriver = localStorage; // 配置使用的存储器驱动
const storage = new xStorage({ driver: defaultDriver, prefix: '' });
/**
 * 设置缓存
 * @param key 缓存标识
 * @param value 值
 */
export function setStorage(key: string, data: unknown, config: StorageConfig = {}) {
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

export function clearStorage() {
  storage.clear();
}

// export function setStorage(key: string, data: unknown, config: StorageConfig = {}): void {
//   const time = new Date().getTime();
//   const value = { expire: config.expire ? time + config.expire * 1000 : undefined, data } as StorageData;
//   Storage.setItem(key, JSON.stringify(value));
// }

// export function getStorage(key: string): unknown {
//   let value = Storage.getItem(key) || '';
//   if (value) {
//     let storageData = JSON.parse(value) as StorageData;
//     const time = new Date().getTime();
//     if (storageData.expire && time <= storageData.expire) {
//       return storageData.data;
//     } else {
//       removeStorage(key);
//     }
//   }
//   return '';
// }
// /**
//  * 移除特定标识缓存
//  * @param keys 缓存标识集合
//  */
// export function removeStorage(...keys: string[]): void {
//   keys.forEach(item => Storage.removeItem(item));
// }
// /**
//  * 清楚所有缓存
//  */
// export function clearStorage(): void {
//   Storage.clear();
// }
// /**
//  * 获取指定索引的key
//  * @param index 索引
//  */
// export function keyStorage(index: number): unknown {
//   return Storage.key(index);
// }
