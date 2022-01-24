const execa = require('execa');
const { remove } = require('fs-extra');
const { resolve } = require('path');
const glob = require('glob');
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);
const args = require('minimist')(process.argv.slice(2));
console.log(commit);
console.log(require('os').cpus().length);
const getPackages = () => glob.sync('packages/**/package.json');
console.log(getPackages());

build();
async function build(target) {
  const res = await execa('node', ['-v']);
  console.log(res);
}
