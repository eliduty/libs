/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2022-02-10 14:04:54
 * @LastEditors: eliduty
 * @LastEditTime: 2022-09-06 22:37:00
 * @Description:
 */
import { readdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import fse from 'fs-extra';
import glob from 'glob';
import type { Package } from 'normalize-package-data';
import { fileURLToPath,URL } from 'node:url';

/**
 * 获取所有公有包的名称
 */
export function getPackagesName(floder: string) {
  return readdirSync(floder).filter(f => {
    if (!statSync(`${floder}/${f}`).isDirectory()) {
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
export function getPackageFilePath(pkgName: string) {
  return fileURLToPath(new URL(`../../packages/${pkgName}/package.json`, import.meta.url));
}

/**
 * 获取package.json的内容
 * @param {*} pkgName
 * @returns
 */
export function getPackage(pkgName: string) {
  return fse.readJsonSync(getPackageFilePath(pkgName)) as unknown as Package;
}

/**
 * 获取package.json 所在目录
 * @param {*} pkgName
 * @returns
 */
export function getPackageDir(pkgName: string) {
  return dirname(getPackageFilePath(pkgName));
}

/**
 * 获取输出目录
 * @param {*} pkgName
 * @returns
 */
export function getPackageDistPath(pkgName: string) {
  const pkg = getPackage(pkgName);
  const pkgDir = getPackageDir(pkgName);
  return dirname(resolve(pkgDir, pkg.main));
}

/**
 * 获取ts输出的声明文件路径
 * @param {*} pkgName
 * @returns
 */
export function getPackageDistTypesPath(pkgName: string) {
  const distDir = getPackageDistPath(pkgName);
  return resolve(distDir, `packages/${pkgName}`);
}

/**
 * 获取匹配文件的文件内容
 * @param {*} glob
 * @returns
 */
export async function getFilesContent(pattern: string) {
  const files = glob.sync(pattern);

  return await Promise.all(
    files.map(file => {
      return fse.readFile(file, 'utf-8');
    })
  );
}
