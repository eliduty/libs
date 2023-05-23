/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2021-03-05 09:48:24
 * @LastEditors: eliduty
 * @LastEditTime: 2023-05-23 18:41:00
 * @Description:类型判断工具库
 */
const toString = Object.prototype.toString;

/**
 * 判断一个值是否为指定类型
 * @param val
 * @param type
 * @returns
 */
export function is(val: unknown, type: string) {
  console.log(toString.call(val));
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 判断变量是否已定义
 * @param val
 * @returns
 */
export function isDef(val: unknown) {
  return is(val, 'Undefined');
}

/**
 * 判断变量值是否为undefined
 * @param val
 * @returns
 */
export function isUnDef(val: unknown) {
  return !isDef(val);
}

/**
 * 判断变量是否为Object
 * @param val
 * @returns
 */
export function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && is(val, 'Object');
}

/**
 * 判断是否为空
 * @param val
 * @returns
 */
export function isEmpty(val: unknown) {
  if (val === null || val === undefined) {
    return true;
  }

  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

/**
 * 判断变量是否为Date
 * @param val
 * @returns
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

/**
 * 判断变量是否为Null
 * @param val
 * @returns
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * 判断变量是否为undefined或者null
 * @param val
 * @returns
 */
export function isNullOrDef(val: unknown): val is null | undefined {
  return isDef(val) || isNull(val);
}

/**
 * 判断变量是否为Number
 * @param val
 * @returns
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

/**
 * 判断是否为String
 * @param val
 * @returns
 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

/**
 * 判断是否为Function
 * @param val
 * @returns
 */
export function isFunction(val: unknown) {
  return is(val, 'Function');
}

/**
 * 判断是否为Boolean
 * @param val
 * @returns
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

/**
 * 判断是否为RegExp
 * @param val
 * @returns
 */
export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

/**
 * 判断是否为Array
 * @param val
 * @returns
 */
export function isArray(val: any): val is any[] {
  return !!val && Array.isArray(val);
}

/**
 * 判断是否为Window对象
 * @param val
 * @returns
 */
export function isWindow(val: unknown): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

/**
 * 判断是否为Element
 * @param val
 * @returns
 */
export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

/**
 * 判断是否是服务端
 * @returns
 */
export function isServer() {
  return typeof window === 'undefined';
}

/**
 * 判断是否为浏览器客户端
 * @returns
 */
export function isClient() {
  return !isServer();
}
