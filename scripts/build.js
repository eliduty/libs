const execa = require('execa');
const { readdirSync, statSync } = require('fs');
const { remove, readFile, writeFile } = require('fs-extra');
const { resolve, dirname } = require('path');
const glob = require('glob');
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);
// const args = require('minimist')(process.argv.slice(2));
// console.log(commit);
const cupNumber = require('os').cpus().length;
const packages = getPackagesName();

run();

async function run() {
  await runParallel(cupNumber, packages, build);
}

async function build(package, packages) {
  // 清除dist目录
  const distDir = getPackageDistPath(package);
  await remove(distDir);
  // rollup打包
  await execa('rollup', ['-c', '--environment', [`TARGET:${package}`]]);
  // 声明文件合并
  await contactTypes(package);
  // 清除ts生成的声明文件
  await remove(`${distDir}/packages`);
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

function getPackageDistTypesPath(package) {
  const distDir = getPackageDistPath(package);
  return resolve(distDir, `packages/${package}`);
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
  const existingDeclarationFiles = glob.sync(`${pkgPath}/src/**/*.d.ts`);
  const existingDeclarationFileContents = await Promise.all(
    existingDeclarationFiles.map(file => {
      return readFile(file, 'utf-8');
    })
  );
  // 匹配ts生成的声明文件
  const declarationFiles = glob.sync(`${typesPath}/**/*.d.ts`);
  const declarationFileContents = await Promise.all(
    declarationFiles.map(file => {
      return readFile(file, 'utf-8');
    })
  );
  // TODO:增加手动声明文件合并
  await writeFile(resolve(pkgPath, pkg.types), existingDeclarationFileContents.join('\n') + '\n' + declarationFileContents.join('\n'));
}
