import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  publicPath: './',
  hash: true,
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  outputPath: path.relative(
    __dirname,
    path.resolve(__dirname, '../output/render'),
  ),
});
