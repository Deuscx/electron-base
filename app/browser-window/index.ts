import { BrowserWindow } from 'electron';
import { messageBox } from 'app/dialog';
import { createStartWindow } from './windows/start-window';

// types declaration
export type WindowName = 'start';
export type CreateWindowOptions = unknown;
export type CreateWindowHandler = (
  options?: CreateWindowOptions,
) => BrowserWindow;
// handlers for creating window
const HandlersMap: Record<WindowName, CreateWindowHandler> = {
  start: createStartWindow,
};

let CLOSE_WINDOW = false;

// browserWindow store
const WindowMap = new Map<WindowName, BrowserWindow>();

// create window by name
export function createWindow(
  name: WindowName,
  options?: CreateWindowOptions,
): BrowserWindow {
  const handler = HandlersMap[name];
  if (typeof handler !== 'function') {
    throw new Error(`no handler for ${name}!`);
  }

  const win = handler(options);
  WindowMap.set(name, win);

  // listener for all window
  win.on('closed', () => WindowMap.delete(name));

  //友好展示
  win.on('ready-to-show', () => {
    win.show();
  });

  // listener for all webcontents 渲染进程意外消失
  win.webContents.on('render-process-gone', async (event, details) => {
    console.log(event, details);
    messageBox.error({
      message: `The renderer process gone. ${details.reason}`,
      buttons: ['quit', 'relaunch'],
    });
  });
  win.webContents.on(
    'console-message',
    (e: Event, level: number, message: string) => {
      const arr = ['debug', 'log', 'warn', 'error'] as const;
      // logger[arr[level] || 'log'](message)
    },
  );

  //主窗口不会关闭，而是隐藏
  hackFakeCloseMainWindow(win);
  return win;
}

/**
 * @description 恢复主窗口显示
 */
export function restoreMainWindow() {
  const win = WindowMap.get('start');
  win?.restore();
  win?.show();
}
function hackFakeCloseMainWindow(win: BrowserWindow) {
  win.on('close', event => {
    if (CLOSE_WINDOW) return;
    event.preventDefault();
    if (win.isFullScreen()) {
      win.setFullScreen(false);
    } else {
      win.hide();
    }
  });
}

export function closeMainWindow() {
  CLOSE_WINDOW = true;
  for (const win of WindowMap) {
    win[1].close();
  }
  CLOSE_WINDOW = false;
}
