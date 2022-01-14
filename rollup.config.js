import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
const resolve = p => path.resolve(p);

export default {
  input: resolve('src/index.ts'),
  output: [
    // {
    //   file: pkg.main,
    //   format: 'umd',
    // },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [nodeResolve(), typescript()],
};
