// https://www.npmjs.com/package/lint-staged
module.exports = {
  'src/**/*.{js,ts}': ['prettier --write','eslint --cache --fix']
};
