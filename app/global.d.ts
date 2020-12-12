import { JSBridgeType } from 'app/preload/preload';

declare global {
  interface Window {
    JSBridge: JSBridgeType;
  }
}
