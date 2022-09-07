/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2022-02-10 14:04:54
 * @LastEditors: eliduty
 * @LastEditTime: 2022-09-06 22:23:06
 * @Description:
 */
import { readdirSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { readFile } from 'fs-extra';
import glob from 'glob';

/**
 * 获取所有公有包的名称
 */
function getPackagesName() {
  return readdirSync('packages').filter((f:string) => {
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
 * @param {*} pkgName
 * @returns
 */
function getPackageFilePath(pkgName: string) {
  return resolve(__dirname, `../packages/${pkgName}/package.json`);
}

/**
 * 获取package.json的内容
 * @param {*} pkgName
 * @returns
 */
function getPackage(pkgName: string) {
  return require(getPackageFilePath(pkgName));
}

/**
 * 获取package.json 所在目录
 * @param {*} pkgName
 * @returns
 */
function getPackageDir(pkgName: string) {
  return dirname(getPackageFilePath(pkgName));
}

/**
 * 获取输出目录
 * @param {*} pkgName
 * @returns
 */
function getPackageDistPath(pkgName: string) {
  const pkg = getPackage(pkgName);
  const pkgDir = getPackageDir(pkgName);
  return dirname(resolve(pkgDir, pkg.main));
}

/**
 * 获取ts输出的声明文件路径
 * @param {*} package
 * @returns
 */
function getPackageDistTypesPath(pkgName: string) {
  const distDir = getPackageDistPath(pkgName);
  return resolve(distDir, `packages/${pkgName}`);
}

/**
 * 获取匹配文件的文件内容
 * @param {*} glob
 * @returns
 */
async function getFilesContent(pattern: string) {
  const files = glob.sync(pattern);
  return await Promise.all(
    files.map((file: string) => {
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
export async function runParallel(maxConcurrency: any, source: any, iteratorFn: any) {
  const ret: Promise<any>[] = [];
  const executing: Promise<any>[] = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source));
    ret.push(p);

    if (maxConcurrency <= source.length) {
      const e: any = p.then(() => executing.splice(executing.indexOf(e), 1));
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
