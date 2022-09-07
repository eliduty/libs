
import execa from 'execa';
import chalk from 'chalk';
import fse from 'fs-extra';
import { resolve } from 'path';
import { runParallel} from './utils'
import { getPackagesName, getPackageDistPath, getPackage, getPackageDir, getPackageDistTypesPath, getFilesContent } from './utils/package';
const { remove, writeFile } =fse
const args= require('minimist')(process.argv.slice(2));
const targets:string[]  = args._;
// const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);
// console.log(commit);
const cupNumber = require('os').cpus().length;
const packages = getPackagesName('packages');

run();
/**
 * 任务执行入口
 */
async function run() {
  if (!targets.every(item => packages.includes(item))) {
    console.log(chalk.red('包名参数无效！'));
    process.exit();
  }
  await runParallel(cupNumber, targets.length ? targets : packages, build);
}

/**
 * 构建方法
 * @param {*} pkgName
 */
async function build(pkgName:string) {
  // 清除dist目录
  await removeDist(pkgName);
  // rollup打包
  await execa('rollup', ['-c', '--environment', `TARGET:${pkgName}`]);
  // 声明文件合并
  await contactTypes(pkgName);
  // 清除ts自动生成的声明文件
  await removeTypeDefinition(pkgName);
}

/**
 * 移除打包生成的文件
 * @param {*} pkgName
 */
async function removeDist(pkgName:string) {
  const distDir = getPackageDistPath(pkgName);
  await remove(distDir);
}

/**
 * 合并package的类型声明文件
 * @param {*} pkgName
 */
async function contactTypes(pkgName:string) {
  const pkg = getPackage(pkgName);
  if (!pkg.types) return;
  // 获取输出目录
  const pkgPath = getPackageDir(pkgName);
  const typesPath = getPackageDistTypesPath(pkgName);
  // src目录下的自定义声明文件
  const existingDeclarationFileContents = await getFilesContent(`${pkgPath}/src/**/*.d.ts`);
  // 匹配ts生成的声明文件
  const declarationFileContents = await getFilesContent(`${typesPath}/**/*.d.ts`);
  await writeFile(resolve(pkgPath, pkg.types), existingDeclarationFileContents.join('\n') + '\n' + declarationFileContents.join('\n'));
}

/**
 * 清除对应包声明文件
 * @param {*} pkgName
 */
async function removeTypeDefinition(pkgName:string) {
  const distDir = getPackageDistPath(pkgName);
  // 清除ts生成的声明文件
  await remove(`${distDir}/packages`);
}
