import { describe, expect, test } from 'vitest';
import { is, isDef, isUnDef, isObject, isEmpty, isDate, isNull, isNullOrDef, isNumber, isString, isFunction, isBoolean, isRegExp, isArray } from '@eliduty/type';

describe('type function test', () => {
  test('is', () => {
    expect(is('', 'String')).toBe(true);
    expect(is([], 'Array')).toBe(true);
    expect(is({}, 'Object')).toBe(true);
    expect(is(null, 'Null')).toBe(true);
    expect(is(undefined, 'Undefined')).toBe(true);
    expect(is(true, 'Boolean')).toBe(true);
    expect(is(false, 'Boolean')).toBe(true);
    expect(is(0, 'Number')).toBe(true);
    expect(is(1, 'Number')).toBe(true);
    expect(is(1.1, 'Number')).toBe(true);
    expect(is(-1, 'Number')).toBe(true);
    expect(is(new Promise(() => true), 'Promise')).toBe(true);
    expect(is(new Date(), 'Date')).toBe(true);
    expect(is(() => {}, 'Function')).toBe(true);
    expect(is(Symbol(), 'Symbol')).toBe(true);
    expect(is(new Map(), 'Map')).toBe(true);
    expect(is(new Set(), 'Set')).toBe(true);
    expect(is(new RegExp(''), 'RegExp')).toBe(true);
  });

  test('isDef', () => {
    expect(isDef(null)).toBe(false);
    expect(isDef(undefined)).toBe(true);
  });

  test('isUnDef', () => {
    expect(isUnDef(null)).toBe(true);
    expect(isUnDef(undefined)).toBe(false);
  });

  test('isObject', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject({})).toBe(true);
  });

  test('isEmpty', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(' ')).toBe(false);
    expect(isEmpty(0)).toBe(false);
  });

  test('isDate', () => {
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(new Date())).toBe(true);
  });

  test('isNull', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
  });

  test('isNullOrDef', () => {
    expect(isNullOrDef(null)).toBe(true);
    expect(isNullOrDef(undefined)).toBe(true);
  });

  test('isNumber', () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(0)).toBe(true);
  });

  test('isString', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString('')).toBe(true);
  });

  test('isFunction', () => {
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(() => {})).toBe(true);
  });

  test('isBoolean', () => {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  test('isRegExp', () => {
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp(new RegExp(''))).toBe(true);
  });

  test('isArray', () => {
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray([])).toBe(true);
  });
});
