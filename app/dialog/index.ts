//https://www.electronjs.org/docs/api/dialog
/* 
 4种dialog
 1.showOpenDialog 打开对话框
 2.showSaveDialog 保存对话框
 3.showMessageBox 消息对话框
 4.showErrorBox 错误对话框
*/
import { dialog, BrowserWindow } from 'electron';

function createMessageBoxShow(
  type: NonNullable<Electron.MessageBoxOptions['type']>,
) {
  // 这里将window参数反置，因为一般情况下其实不会用到window参数，这里参考了vscode的做法
  return function dialogShowMessageBox(
    options: Omit<Electron.MessageBoxOptions, 'type'>,
    window?: BrowserWindow,
  ) {
    if (window) {
      return dialog.showMessageBox(window, { type, ...options });
    }
    return dialog.showMessageBox({ type, ...options });
  };
}

// 消息提示
export const messageBox = {
  none: createMessageBoxShow('none'),
  info: createMessageBoxShow('info'),
  error: createMessageBoxShow('error'),
  question: createMessageBoxShow('question'),
  warning: createMessageBoxShow('warning'),
};
