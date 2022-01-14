export interface StorageConfig {
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
export declare function setStorage(key: string, data: unknown, config?: StorageConfig): void;
/**
 * 获取缓存
 * @param key 缓存标识
 */
export declare function getStorage(key: string): unknown;
/**
 * 移除特定标识缓存
 * @param keys 缓存标识集合
 */
export declare function removeStorage(...keys: string[]): void;
/**
 * 清楚所有缓存
 */
export declare function clearStorage(): void;
/**
 * 获取指定索引的key
 * @param index 索引
 */
export declare function keyStorage(index: number): unknown;
