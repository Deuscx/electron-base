import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { getSystemPlatform } from './utils/common';
import { setUpTray } from './tray';
import {
  createWindow,
  restoreMainWindow,
  closeMainWindow,
} from './browser-window';
import checkVersion from './utils/update';
const env = process.env.NODE_ENV;

function run() {
  // https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock
  // 请求单例锁，避免打开多个electron实例
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
    return;
  }
  // 如果有第二个实例 将重启应用 。为避免启动 多个应用
  app.on('second-instance', () => {
    restoreMainWindow();
  });

  app.on('ready', () => {
    const win = createWindow('start');
    checkVersion();
    if (env === 'development') {
      win.webContents.openDevTools();
      // add React Develope Tools to electron
      import('./plugins/devtool').then(module => {
        module.default.installDevToolExtension();
      });
    }
    setUpTray();
  });

  app.on('will-finish-launching', function() {
    ipcMain.handle('app/get_basic_info', function handleAppGetBasicInfo() {
      return {
        version: app.getVersion(),
        name: app.name,
      };
    });
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (getSystemPlatform() === 'MAC') {
      // to provent error when reopen window in mac
      ipcMain.removeAllListeners();
    } else {
      app.quit();
    }
  });

  app.on('before-quit', () => {
    closeMainWindow();
  });
  /* macos 中特有事件 */
  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    restoreMainWindow();
  });
}

run();
