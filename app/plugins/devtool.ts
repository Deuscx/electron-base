/**
 * add devToolsExtension for electron
 * more details in electron-devtools-installer
 */
import {
  default as installExtension,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

export default {
  installDevToolExtension: (): void => {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: Error) => console.log('An error occurred: ', err));
  },
};
