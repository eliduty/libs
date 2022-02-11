import { resolve } from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
const pkgName = process.env.TARGET;
if (!pkgName) {
  throw new Error('通过 --environment TARGET:[package] 指定需要构建的package');
}
const pkgDir = resolve(__dirname, `packages/${pkgName}`);
const entryFile = resolve(pkgDir, 'src/index.ts');
const pkgFilePath = resolve(pkgDir, 'package.json');
const pkg = require(pkgFilePath);

export default {
  input: entryFile,
  output: [
    {
      file: resolve(pkgDir, pkg.main),
      format: 'umd',
      name: `E${pkgName}`,
    },
    {
      file: resolve(pkgDir, pkg.module),
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve(),
    terser(),
    typescript({
      tsconfig: resolve(__dirname, 'tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
      },
    }),
  ],
};
