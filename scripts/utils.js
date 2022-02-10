/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2022-02-10 14:04:54
 * @LastEditors: eliduty
 * @LastEditTime: 2022-02-10 16:44:33
 * @Description:
 */
const { readdirSync, statSync } = require('fs');
const { resolve, dirname } = require('path');
const { readFile } = require('fs-extra');
const glob = require('glob');

/**
 * 获取所有公有包的名称
 */
function getPackagesName() {
  return readdirSync('packages').filter(f => {
    if (!statSync(`packages/${f}`).isDirectory()) {
      return false;
    }
    const pkg = getPackage(f);
    if (pkg.private) {
      return false;
    }
    return true;
  });
}

/**
 * 获取packageFilePath
 * @param {*} package
 * @returns
 */
function getPackageFilePath(package) {
  return resolve(__dirname, `../packages/${package}/package.json`);
}

/**
 * 获取package.json的内容
 * @param {*} package
 * @returns
 */
function getPackage(package) {
  return require(getPackageFilePath(package));
}

/**
 * 获取package.json 所在目录
 * @param {*} package
 * @returns
 */
function getPackageDir(package) {
  return dirname(getPackageFilePath(package));
}

/**
 * 获取输出目录
 * @param {*} package
 * @returns
 */
function getPackageDistPath(package) {
  const pkg = getPackage(package);
  const pkgDir = getPackageDir(package);
  return dirname(resolve(pkgDir, pkg.main));
}

/**
 * 获取ts输出的声明文件路径
 * @param {*} package
 * @returns
 */
function getPackageDistTypesPath(package) {
  const distDir = getPackageDistPath(package);
  return resolve(distDir, `packages/${package}`);
}

/**
 * 获取匹配文件的文件内容
 * @param {*} glob
 * @returns
 */
async function getFilesContent(pattern) {
  const files = glob.sync(pattern);
  return await Promise.all(
    files.map(file => {
      return readFile(file, 'utf-8');
    })
  );
}

/**
 * 并行执行任务
 * @param {*} maxConcurrency
 * @param {*} source
 * @param {*} iteratorFn
 * @returns
 */
async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source));
    ret.push(p);

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

module.exports = {
  getPackagesName,
  getPackageFilePath,
  getPackage,
  getPackageDir,
  getPackageDistPath,
  getPackageDistTypesPath,
  getFilesContent,
  runParallel,
};
