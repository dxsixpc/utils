import rollupConfig from '@dxsixpc/configs/rollup-config/index.js';
import fs from 'fs-extra'
import { resolve } from 'path'

const pakg = await fs.readJSON(resolve('package.json'))

export default rollupConfig({
  pakg,
  output: [
    // 打包为commonJS模块
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true
    },
    // 打包为ES6模块
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ]
});
