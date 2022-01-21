const execa = require('execa');
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);
const args = require('minimist')(process.argv.slice(2))
console.log(commit);
console.log(require('os').cpus().length);
