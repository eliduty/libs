# @eliduty/storage

![npm](https://img.shields.io/npm/dt/@eliduty/storage) ![npm](https://img.shields.io/npm/v/@eliduty/storage)

该工具库是在本地存储的基础上进行的封装，优化使用体验，支持自定义localStorage和sessionStorage存储驱动。

**特性：**

- 自定义存储驱动，支持localStorage和sessionStorage。
- 支持缓存key前缀
- value值类型保真
- 支持UMD、ESM的使用方式

## 安装

```shell
npm install @eliduty/storage
// 或
yarn add @eliduty/storage
// 或
pnpm install @eliduty/storage
```

## 使用

该工具库提供两种使用方法：

1. 使用内置的基于localStorage的存储驱动。

```javascript
import { setStorage, getStorage, removeStorage, clearStorage } from '@eliduty/storage';

setStorage(key, value, { expire: 10 }); //设置缓存

getStorage(key); //获取缓存

removeStorage(key); //移除特定标识缓存

clearStorage(); //清除所有缓存
```

2. 对象实例化，自定义存储驱动和key前缀。

```javascript
import Storage from '@eliduty/storage';

const storage = new Storage({ driver: sessionStorage, prefix: 'prefix_' });

storage.set(key, value, { expire: 10 }); //设置缓存

storage.get(key); //获取缓存

storage.remove(key); //移除特定标识缓存

storage.clear(); //清除所有缓存

```
