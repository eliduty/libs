/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2022-02-10 14:02:10
 * @LastEditors: eliduty
 * @LastEditTime: 2022-08-12 22:33:39
 * @Description:
 */

/*
  发布流程
  1、构建打包
  2、选择需要更新子包
  3、更新子包版本
  4、更新主包版本号、git tag 、生成changelog
 */
const { readFileSync, writeFileSync } = require('fs');
const execa = require('execa');
const { prompt } = require('enquirer');
const semver = require('semver');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));
const { getPackagesName, getPackage, getPackageFilePath, runParallel } = require('./utils');
const isPre = args.pre || args.p; // 预发布
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts });

const step = msg => console.log(chalk.cyan(msg));
const cupNumber = require('os').cpus().length;
main().catch(console.error);

async function main() {
  // 检查github git提交是否正常
  await checkGithubNetwork();
  // 检查是否登录了npm
  await checkIsLoginNpm();
  // 选择需要更新子包
  const releasePackages = await selectPackages();
  // 选择发布的版本
  const releaseVersion = await selectReleaseVersion(isPre);
  // 计算版本
  const versionInfo = await computedVersion(releasePackages, releaseVersion);
  //确认版本号
  await confirmVersion(versionInfo);
  //构建打包
  await buildPackages(releasePackages);
  // 更新子包版本
  await updatePackages(versionInfo);
  // 更新主包版本号、git tag 、生成changelog
  const isSuccess = await updateMainPackage(releaseVersion);
  // 根据主包发布结果，处理子包git message
  await commitPackagesMessage(versionInfo, !isSuccess);
  // 发布包
  await publishPackage(versionInfo);
  step('\n发布完成！');
  // 提交git
  await commitGit();
}

/**
 * 检查github git提交是否正常
 */
async function checkGithubNetwork() {
  step('\n检查github网络连接...');
  const isSuccess = await run('git', ['pull']).catch(() => false);
  if (!isSuccess) {
    console.log(chalk.red('网络连接异常！'));
    process.exit();
  }
}

/**
 * 检查是否登录了npm
 */
async function checkIsLoginNpm() {
  step('\n验证当前登录状态...');
  const isLogin = await run('pnpm', ['whoami']).catch(() => false);
  if (!isLogin) {
    console.log(chalk.red('用户未登录npm！'));
    process.exit();
  }
}

/**
 * 选择发布版本
 */
async function selectReleaseVersion(isPre) {
  const preReleaseVersion = [
    {
      name: 'prerelease',
      desc: '升级预发布号',
    },
    {
      name: 'prepatch',
      desc: '升级修订号，保留预发布号',
    },
    {
      name: 'preminor',
      desc: '升级次版本号，保留预发布号',
    },
    {
      name: 'premajor',
      desc: '升级主版本号，保留预发布号',
    },
  ];
  const releaseVersion = [
    {
      name: 'patch',
      desc: '升级修订号',
    },
    {
      name: 'minor',
      desc: '升级次版本号',
    },
    {
      name: 'major',
      desc: '升级主版本号',
    },
  ];

  const versionIncrements = [...(isPre ? preReleaseVersion : releaseVersion)].concat([{ name: 'custom', desc: '自定义' }]);
  const { versionName } = await prompt({
    type: 'select',
    name: 'versionName',
    message: '[单选]请选择一个发布的版本',
    choices: versionIncrements.map(i => ({
      message: `${i.name.padEnd(10, ' ')} - ${i.desc}`,
      name: i.name,
    })),
  });
  return versionName;
}
/**
 * 选择要发布的包
 * @returns
 */
async function selectPackages() {
  const packages = getPackagesName();
  const { releasePackages } = await prompt({
    type: 'multiselect',
    name: 'releasePackages',
    message: '[多选]请选择要发布的包（使用空格键选择）',
    choices: packages,
  });
  if (!releasePackages.length) {
    throw new Error(`至少选择一个要发布的包`);
  }
  return releasePackages;
}
/**
 * 计算版本号
 * @param {*} releasePackages
 * @param {*} releaseVersion
 */
async function computedVersion(packages, releaseVersion) {
  const isCustom = releaseVersion === 'custom';
  let customVersion;
  if (isCustom) {
    customVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: '请输入版本号(示例：1.2.3)',
      })
    ).version;
    if (!semver.valid(customVersion)) {
      throw new Error(`无效的版本号: ${customVersion}`);
    }
  }
  let versionInfo = [];
  packages.forEach(package => {
    const current = getPackage(package).version;
    const target = isCustom ? customVersion : semver.inc(getPackage(package).version, releaseVersion);
    versionInfo.push({
      package,
      current,
      target,
      isValid: semver.lt(current, target),
    });
  });
  return versionInfo;
}
/**
 * 确认版本信息
 * @param {*} versionInfo
 */
async function confirmVersion(versionInfo) {
  step('确认版本信息');
  let invalidVersion = [];
  versionInfo.map(version => {
    const isValid = version.isValid;
    !isValid && invalidVersion.push(version);
    console.log(`${isValid ? '✅' : '❌'} ${version.package} (${version.current} → ${version.target})\n`);
  });
  if (invalidVersion.length) {
    const invalidPackage = invalidVersion.map(item => item.package).join('、');
    throw new Error(`${invalidPackage}目标版本号无效`);
  }
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `确认发布？`,
  });
  if (!yes) {
    process.exit();
  }
}
/**
 * 构建打包
 */
async function buildPackages(packages) {
  step('\n正在构建...');
  await run('pnpm', ['run', 'build', ...packages]);
}
/**
 * 更新子包版本信息
 * @param {*} releasePackagesVersionInfo
 */
async function updatePackages(releasePackagesVersionInfo) {
  step('\n正在更新子包版本...');
  releasePackagesVersionInfo.forEach(item => {
    const pkgPath = getPackageFilePath(item.package);
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    pkg.version = item.target;
    writeFileSync(pkgPath, JSON.stringify(pkg, '', '\t'), { encoding: 'utf8' });
  });
}
/**
 * 更新主包
 */
async function updateMainPackage(releaseVersion) {
  step('\n更新主包信息...');
  const isSuccess = await run('pnpm', ['version', releaseVersion]).catch(() => false);
  return !!isSuccess;
}

async function commitPackagesMessage(releasePackagesVersionInfo, isRollBack) {
  if (isRollBack) {
    // 主包发布失败 回滚子包
    runParallel(cupNumber, releasePackagesVersionInfo, rollback);
  } else {
    // 主包发布成功 提交子包message
    const releaseCommit = [];
    releasePackagesVersionInfo.forEach(item => {
      // 子包commit message
      releaseCommit.push(`${item.package} v${item.target}`);
    });
    // 提交子包commit message
    const { stdout } = await run('git', ['diff'], { stdio: 'pipe' });
    if (stdout) {
      step('\nCommitting changes...');
      await run('git', ['add', '-A']);
      await run('git', ['commit', '-m', `chore(release): ${releaseCommit.join(' ')}`]);
    } else {
      console.log('No changes to commit.');
    }
  }
}

/**
 * 回滚包
 * @param {*} package
 */
async function rollback(versionInfo) {
  const pkgPath = getPackageFilePath(versionInfo.package);
  step(`\n正在回滚${pkgPath}...`);
  await run('git', ['checkout', '-q', '--', pkgPath]);
}

/**
 * 发布选中的包
 */
async function publishPackage(versionInfoList) {
  step('\n发布包到npm...');
  await runParallel(cupNumber, versionInfoList, pushlish);
}

async function pushlish(versionInfo) {
  step(`\n正在发布${versionInfo.package}...`);
  await run('pnpm', ['publish', '--filter', versionInfo.package, '--access', 'public']);
}

async function commitGit() {
  step(`\n提交git信息...`);
  try {
    await run('git', ['push']);
    await run('git', ['push', '--follow-tags origin main']);
  } catch (err) {
    console.log(chalk.red('github网络连接异常，请尝试手动提交！'));
  }
}
