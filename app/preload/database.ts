import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import fs from 'fs-extra';
import { app } from 'electron';
import { DEFAULT_CONFIG } from 'app/config';
const STORE_PATH = app.getPath('userData'); // 获取electron应用的用户目录

const adapter = new FileSync(path.join(STORE_PATH, '/umi-electron.json')); // 初始化lowdb读写的json文件名以及存储路径

const db = low(adapter);

function initDataBase(): void {
  // 如果不存在路径
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH);
    db.defaults(DEFAULT_CONFIG).write();
  }
}

export { initDataBase };
export default db;
