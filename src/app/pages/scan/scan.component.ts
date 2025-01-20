import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {BarcodeFormat} from '@zxing/library';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {getSettings} from '../../../getSettings';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [ZXingScannerModule, ReactiveFormsModule, NgClass],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent implements OnInit, AfterViewInit {
  router = inject(Router);
  errorMessage: string | undefined
  barcode = new FormControl('', Validators.required);
  activatedRoute = inject(ActivatedRoute);
  queryParams: any;
  protected cameras!: MediaDeviceInfo[];
  protected selectedDevice!: MediaDeviceInfo;
  @ViewChild('BARCODE') BarcodeInputElement!: ElementRef;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
      if (this.queryParams.error) {
        this.errorMessage = 'Barcode non trovato.';
      }
    });
  }

  ngAfterViewInit(): void {
    if (getSettings.isForcedInputEnabled()) {
      setTimeout(() => {
        this.BarcodeInputElement.nativeElement.focus();
      }, 0);
    }
  }

  onValueChanges(result: any) {
    this.router.navigate(['/view', result]);
  }

  submit() {
    this.router.navigate(['/view', this.barcode.value]);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  onCamerasFound(cameras: MediaDeviceInfo[]): void {
    // Find the back camera (usually labeled as "environment" or "rear")
    this.cameras = cameras;
    const backCamera = cameras.find(camera => camera.label.toLowerCase().includes('back') || camera.label.toLowerCase().includes('rear') || camera.label.toLowerCase().includes('environment'));

    if (backCamera) {
      // Set the back camera as the selected device
      this.selectedDevice = backCamera;
    } else {
      console.warn('Back camera not found. Using the first available camera.');
      this.selectedDevice = cameras[0]; // Fallback to the first camera if no back camera is found
    }
  }

  changeCamera() {
    // Find the index of the current camera
    const currentIndex = this.cameras.findIndex(camera => camera.deviceId === this.selectedDevice.deviceId);
    // Calculate the index of the next camera
    const nextIndex = (currentIndex + 1) % this.cameras.length;
    // Set the next camera as the selected device
    this.selectedDevice = this.cameras[nextIndex];
  }

  protected readonly BarcodeFormat = BarcodeFormat;
  protected readonly getSettings = getSettings;
}
