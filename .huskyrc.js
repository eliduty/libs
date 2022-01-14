module.exports = {
  hooks: {
    'pre-commit': 'npx @ls-lint/ls-lint && npx lint-staged --allow-empty',
    'commit-msg': 'npx --no-install commitlint --edit $1',
  },
};
