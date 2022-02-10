/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2022-02-10 14:02:10
 * @LastEditors: eliduty
 * @LastEditTime: 2022-02-10 17:29:12
 * @Description:
 */

/*
  发布流程
  1、构建打包
  2、选择需要更新子包
  3、更新子包版本
  4、更新主包版本号、git tag 、生成changelog
 */
const execa = require('execa');
const { MultiSelect } = require('enquirer');
const semver = require('semver');
const { getPackagesName, getPackage } = require('./utils');

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts });
main();
const step = msg => console.log(chalk.cyan(msg));
const inc = i => semver.inc(currentVersion, i, preId);

async function main() {
  // 选择需要更新子包
  const releasePackages = await selectPackages();
  console.log(releasePackages);
  // //构建打包
  // await buildPackages();

  // // 更新子包版本
  // await updatePackages();
  // // 更新主包版本号、git tag 、生成changelog
  // await updateMainPackage();
}

async function buildPackages() {
  await run('pnpm', ['run', 'build']);
}

async function selectPackages() {
  const packages = getPackagesName();

  const choices = packages.map(pkg => {
    const pkgVersion = getPackage(pkg).version;
    return {
      name: `${pkg}(当前版本：${pkgVersion})`,
      value: pkg,
    };
  });

  const prompt = new MultiSelect({
    name: 'value',
    message: '请选择要发布的包',
    limit: 7,
    choices,
  });
  const answer = prompt.run();
  return answer;
}
async function updatePackages() {}
async function updateMainPackage() {}
