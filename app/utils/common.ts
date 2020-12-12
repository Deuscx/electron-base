import * as os from 'os';

/**
 * get OS Platform
 * @return {string}
 */
export const getSystemPlatform = (): string => {
  const platforms = {
    WINDOWS: 'WINDOWS',
    MAC: 'MAC',
    LINUX: 'LINUX',
    SUN: 'SUN',
    OPENBSD: 'OPENBSD',
    ANDROID: 'ANDROID',
    AIX: 'AIX',
  };

  const platformsNames = {
    win32: platforms.WINDOWS,
    darwin: platforms.MAC,
    linux: platforms.LINUX,
    sunos: platforms.SUN,
    openbsd: platforms.OPENBSD,
    android: platforms.ANDROID,
    aix: platforms.AIX,
  } as Record<NodeJS.Platform, string>;

  return platformsNames[os.platform()];
};

export const isWin = process.platform === 'win32';
export const isMac = process.platform === 'darwin';
