import path from 'path';
// 注入渲染进程窗口的地址
const isDev = process.env.NODE_ENV !== 'production';

export const DIST_FILE_URL = isDev
  ? 'http://localhost:8000'
  : path.resolve(__dirname, '../render/index.html');

export const PRELOAD_FILE = path.resolve(__dirname, 'preload.js');

/* 默认相关 */
export const DEFAULT_CONFIG = {
  common: {
    autoUpdate: true,
  },
};

export type DEFAULT_CONFIG_INTERFACE = typeof DEFAULT_CONFIG;
