(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Elibs = {}));
})(this, (function (exports) { 'use strict';

  /*
   * @Author: eliduty
   * @Github: https://github.com/eliduty
   * @Date: 2021-03-03 15:57:53
   * @LastEditors: eliduty
   * @LastEditTime: 2022-01-14 20:41:35
   * @Description:
   */
  var Storage = localStorage; // 配置使用的存储器驱动
  /**
   * 设置缓存
   * @param key 缓存标识
   * @param value 值
   */
  function setStorage(key, data, config) {
      if (config === void 0) { config = {}; }
      var time = new Date().getTime();
      var value = { expire: config.expire ? time + config.expire * 1000 : undefined, data: data };
      Storage.setItem(key, JSON.stringify(value));
  }
  /**
   * 获取缓存
   * @param key 缓存标识
   */
  function getStorage(key) {
      var value = Storage.getItem(key) || '';
      if (value) {
          var storageData = JSON.parse(value);
          var time = new Date().getTime();
          if (storageData.expire && time <= storageData.expire) {
              return storageData.data;
          }
          else {
              removeStorage(key);
          }
      }
      return '';
  }
  /**
   * 移除特定标识缓存
   * @param keys 缓存标识集合
   */
  function removeStorage() {
      var keys = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          keys[_i] = arguments[_i];
      }
      keys.forEach(function (item) { return Storage.removeItem(item); });
  }
  /**
   * 清楚所有缓存
   */
  function clearStorage() {
      Storage.clear();
  }
  /**
   * 获取指定索引的key
   * @param index 索引
   */
  function keyStorage(index) {
      return Storage.key(index);
  }

  var storage = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setStorage: setStorage,
    getStorage: getStorage,
    removeStorage: removeStorage,
    clearStorage: clearStorage,
    keyStorage: keyStorage
  });

  exports.storage = storage;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
