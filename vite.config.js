import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.cjs'), // 将入口文件指向您的主文件
      formats: ['cjs'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      plugins: [
        commonjs(),
        nodeResolve({
          preferBuiltins: true,
          browser: false
        })
      ]
    },
    outDir: 'dist'
  }
});
