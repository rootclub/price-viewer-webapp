export class getSettings {
  public static isForcedInputEnabled(): boolean {
    return localStorage.getItem('forcedInput') === 'true';
  }

  public static isCameraDisabled(): boolean {
    return localStorage.getItem('cameraDisabled') === 'true';
  }

  public static isKioskMode(): boolean {
    return localStorage.getItem('kioskMode') === 'true';
  }

  public static isCameraSwitchForbidden(): boolean {
    return localStorage.getItem('cameraSwitchForbidden') === 'true';
  }
}
