const execa = require('execa');
const { remove, writeFile } = require('fs-extra');
const { resolve } = require('path');
const { runParallel, getPackagesName, getPackageDistPath, getPackage, getPackageDir, getPackageDistTypesPath, getFilesContent } = require('./utils');
// const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);
// const args = require('minimist')(process.argv.slice(2));
// console.log(commit);
const cupNumber = require('os').cpus().length;
const packages = getPackagesName();

run();
/**
 * 任务执行入口
 */
async function run() {
  await runParallel(cupNumber, packages, build);
}

/**
 * 构建方法
 * @param {*} package
 */
async function build(package) {
  // 清除dist目录
  await removeDist(package);
  // rollup打包
  await execa('rollup', ['-c', '--environment', [`TARGET:${package}`]]);
  // 声明文件合并
  await contactTypes(package);
  // 清除ts自动生成的声明文件
  await removeTypeDefinition(package);
}

/**
 * 移除打包生成的文件
 * @param {*} package
 */
async function removeDist(package) {
  const distDir = getPackageDistPath(package);
  await remove(distDir);
}

/**
 * 合并package的类型声明文件
 * @param {*} package
 */
async function contactTypes(package) {
  const pkg = getPackage(package);
  if (!pkg.types) return;
  // 获取输出目录
  const pkgPath = getPackageDir(package);
  const typesPath = getPackageDistTypesPath(package);
  // src目录下的自定义声明文件
  const existingDeclarationFileContents = await getFilesContent(`${pkgPath}/src/**/*.d.ts`);
  // 匹配ts生成的声明文件
  const declarationFileContents = await getFilesContent(`${typesPath}/**/*.d.ts`);
  await writeFile(resolve(pkgPath, pkg.types), existingDeclarationFileContents.join('\n') + '\n' + declarationFileContents.join('\n'));
}

/**
 * 清除对应包声明文件
 * @param {*} package
 */
async function removeTypeDefinition(package) {
  const distDir = getPackageDistPath(package);
  // 清除ts生成的声明文件
  await remove(`${distDir}/packages`);
}
