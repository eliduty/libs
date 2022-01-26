const execa = require('execa');
const { remove } = require('fs-extra');
const { resolve } = require('path');
const glob = require('glob');
const { rollup } = require('rollup');
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);
// const args = require('minimist')(process.argv.slice(2));
console.log(commit);
const cupNumber = require('os').cpus().length;
const getPackages = () => glob.sync(resolve(__dirname, '../packages/**/package.json'));
console.log(getPackages());

console.log(__dirname);
run();

async function run() {
  console.log(cupNumber);
  await runParallel(8, getPackages(), build);
}

async function build(target, sources) {
  console.log(target, sources);

  // rollup打包

  // 声明文件合并
  // 多余的声明文件删除
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
