import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {getSettings} from '../../../getSettings';

@Component({
  selector: 'app-settings',
  imports: [
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  setForcedInput(value: boolean): void {
    if (value) {
      localStorage.setItem('forcedInput', 'true');
    } else {
      localStorage.removeItem('forcedInput');
    }
  }

  setCameraDisabled(value: boolean): void {
    if (value) {
      localStorage.setItem('cameraDisabled', 'true');
    } else {
      localStorage.removeItem('cameraDisabled');
    }
  }

  setKioskMode(value: boolean): void {
    if (value) {
      localStorage.setItem('kioskMode', 'true');
    } else {
      localStorage.removeItem('kioskMode');
    }
  }

  setCameraSwitchForbidden(value: boolean): void {
    if (value) {
      localStorage.setItem('cameraSwitchForbidden', 'true');
    } else {
      localStorage.removeItem('cameraSwitchForbidden');
    }
  }

  reset(): void {
    localStorage.clear();
    location.reload();
  }

  protected readonly getSettings = getSettings;
}
