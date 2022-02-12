# @eliduty/type
![npm](https://img.shields.io/npm/dt/@eliduty/type) ![npm](https://img.shields.io/npm/v/@eliduty/type)

该工具库主要是类型判断工具库。

## 安装

```shell
npm install @eliduty/type
// 或
yarn add @eliduty/type
// 或
pnpm install @eliduty/type
```
## 函数列表

```typescript

/**
 * 判断一个值是否为指定类型
 * @param val
 * @param type
 * @returns
 */
export declare function is(val: unknown, type: string): boolean;
/**
 * 判断变量是否已定义
 * @param val
 * @returns
 */
export declare function isDef(val: unknown): boolean;
/**
 * 判断变量值是否为undefined
 * @param val
 * @returns
 */
export declare function isUnDef(val: unknown): boolean;
/**
 * 判断变量是否为Object
 * @param val
 * @returns
 */
export declare function isObject(val: unknown): val is Record<string, unknown>;
/**
 * 判断是否为空
 * @param val
 * @returns
 */
export declare function isEmpty(val: unknown): boolean;
/**
 * 判断变量是否为Date
 * @param val
 * @returns
 */
export declare function isDate(val: unknown): val is Date;
/**
 * 判断变量是否为Null
 * @param val
 * @returns
 */
export declare function isNull(val: unknown): val is null;
/**
 * 判断变量是否为undefined和null
 * @param val
 * @returns
 */
export declare function isNullAndUnDef(val: unknown): val is null | undefined;
/**
 * 判断变量是否为undefined或者null
 * @param val
 * @returns
 */
export declare function isNullOrUnDef(val: unknown): val is null | undefined;
/**
 * 判断变量是否为Number
 * @param val
 * @returns
 */
export declare function isNumber(val: unknown): val is number;
/**
 * 判断是否为Promise
 * @param val
 * @returns
 */
export declare function isPromise(val: unknown): val is Promise<any>;
/**
 * 判断是否为String
 * @param val
 * @returns
 */
export declare function isString(val: unknown): val is string;
/**
 * 判断是否为Function
 * @param val
 * @returns
 */
export declare function isFunction(val: unknown): boolean;
/**
 * 判断是否为Boolean
 * @param val
 * @returns
 */
export declare function isBoolean(val: unknown): val is boolean;
/**
 * 判断是否为RegExp
 * @param val
 * @returns
 */
export declare function isRegExp(val: unknown): val is RegExp;
/**
 * 判断是否为Array
 * @param val
 * @returns
 */
export declare function isArray(val: any): val is any[];
/**
 * 判断是否为Window对象
 * @param val
 * @returns
 */
export declare function isWindow(val: unknown): val is Window;
/**
 * 判断是否为Element
 * @param val
 * @returns
 */
export declare function isElement(val: unknown): val is Element;
/**
 * 判断是否是服务端
 * @returns
 */
export declare function isServer(): boolean;
/**
 * 判断是否为浏览器客户端
 * @returns
 */
export declare function isClient(): boolean;
```
