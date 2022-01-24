import { resolve, dirname } from 'path';
import glob from 'glob';
import { rm } from 'shelljs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
const getPackages = () => glob.sync('./packages/**/package.json');
const generateBuildOption = packages => {
  return packages.map(pkgPath => {
    const packagePath = resolve(pkgPath);
    let pkg = require(packagePath);
    const pkgDir = dirname(packagePath);
    // 清除构建成果
    rm('-rf', `${pkgDir}/dist/*`);
    return {
      input: `${pkgDir}/src/index.ts`,
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
      plugins: [
        nodeResolve(),
        typescript({
          tsconfig: resolve(__dirname, 'tsconfig.json'),
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
              outDir:resolve('./'),
              declarationDir: resolve(`./dist`),
            },
          },
        }),
      ],
    };
  });
};

const buildOptions = generateBuildOption(getPackages());
export default buildOptions;
