import { resolve, dirname } from 'path';
import glob from 'glob';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
const buildOptions = generateBuildOption(getPackages());
function getPackages() {
  return glob.sync('./packages/**/package.json');
}

function generateBuildOption(packages) {
  return packages.map(pkgPath => {
    const packagePath = resolve(pkgPath);
    let pkg = require(packagePath);
    const pkgDir = dirname(packagePath);
    return {
      input: `${pkgDir}/index.ts`,
      output: [
        {
          file: resolve(pkgDir, pkg.main),
          format: 'cjs',
        },
        {
          file: resolve(pkgDir, pkg.module),
          format: 'esm',
        },
      ],
      plugins: [nodeResolve(), typescript()],
    };
  });
}

export default buildOptions;
