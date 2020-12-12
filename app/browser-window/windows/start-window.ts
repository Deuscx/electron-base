import { DIST_FILE_URL, PRELOAD_FILE } from 'app/config';
//import { registerFileManagerService } from 'app/file-manager'
import { BrowserWindow, shell } from 'electron';
import { CreateWindowHandler } from '..';

//https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
const OPTIONS: Electron.BrowserWindowConstructorOptions = {
  width: 1280,
  height: 900,
  minWidth: 960,
  minHeight: 640,
  titleBarStyle: 'default',
  autoHideMenuBar: false,
  show: false,
  backgroundColor: '#2e2c29',
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false,
    preload: PRELOAD_FILE,
    enableRemoteModule: true,
  },
};

const URL = `${DIST_FILE_URL}#/`;

export const createStartWindow: CreateWindowHandler = () => {
  const win = new BrowserWindow(OPTIONS);
  win.loadURL(URL);

  win.webContents.on('will-navigate', (event, url) => {
    if (/^http(s)?:/.test(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  return win;
};
