import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Blemishes, Details, Exterior, Image, Interior} from "../../../model/CheckPhotos";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ButtonComponent} from "../../elements/button/button.component";
import {Data} from "./data";
@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    ButtonComponent
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent {

  public currentPhoto: number = 0;
  public photosExteriorExample = Data.exteriorData
  public photosInteriorExample = Data.interiorData
  public photosDetailsExample = Data.detailsData
  public images: Image[] = []
  @Input()
  public type!: string
  @Output()
  photos = new EventEmitter<any>();
  @ViewChild('videoElement')
  videoElement: ElementRef | undefined;
  @ViewChild('canvasElement')
  canvasElement: ElementRef | undefined;
  @ViewChild('photoElement')
  photoElement: ElementRef | undefined;

  mediaStream: MediaStream | undefined;
  imageCapture: any
  erreur: any;
  flashEnabled: boolean = true; // État de la lampe torche
  inProgress: boolean = true;

  constructor() {
    this.startCamera();
  }

  getImageExample() {
    switch (this.type) {
      case "exterior" :
        return this.photosExteriorExample[this.currentPhoto];
      case "interior" :
        return this.photosInteriorExample[this.currentPhoto];
      case "details" :
        return this.photosDetailsExample[this.currentPhoto];
    }
    return;
  }

  async startCamera() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: {ideal: 1920},  // Demande une largeur idéale de 1920px
          height: {ideal: 1080}, // Demande une hauteur idéale de 1080px
          facingMode: 'environment'
        }
      });

      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = this.mediaStream;
        this.videoElement.nativeElement.onloadedmetadata = () => {
          this.videoElement?.nativeElement.play().then(() => {
            console.log("je suis la")
            this.inProgress = false;
          });
        }
      }
      const track: any = this.mediaStream.getVideoTracks()[0];
      await this.checkFocusCapabilities(track)

      // Activer la lampe torche si possible
      if (typeof track.getCapabilities === 'function') {
        let capabilities: any = track.getCapabilities();
        if (capabilities.torch) {
          await track.applyConstraints({
            advanced: [{torch: this.flashEnabled, focusMode: 'auto'}]
          });
        }
      }
    } catch (error) {
      this.erreur = error;
      console.error('Erreur lors de l’accès à la caméra:', error);
    }
  }

  async checkFocusCapabilities(videoTrack: any) {
    const capabilities = videoTrack.getCapabilities();
    console.log(capabilities);
    if (capabilities.focusMode) {
      console.log('Modes de focus supportés:', capabilities.focusMode);
      this.erreur = 'supportés'
      return true;
    }
    this.erreur = capabilities;

    return false;
  }

  async toggleFlash() {
    if (!this.mediaStream) {
      console.error('La caméra n’est pas active.');
      return;
    }
    const track: any = this.mediaStream.getVideoTracks()[0];
    const capabilities: any = track.getCapabilities();

    if (!capabilities.torch) {
      console.error('La lampe torche n’est pas disponible sur ce dispositif.');
      return;
    }

    this.flashEnabled = !this.flashEnabled;
    await track.applyConstraints({advanced: [{torch: this.flashEnabled}]});
  }

  closeCamera(){
    this.photos.emit(this.images);
  }

  capturePhoto() {
    if (this.videoElement && this.canvasElement) {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      new Promise((resolve, reject) => {
        canvas.toBlob((blob: Blob) => {
          if (!blob) {
            reject(new Error('Blob creation failed'));
          }
          resolve(blob);
        }, 'image/jpeg');
      })
        .then((blob: any) => {
          this.images.push({blob: blob});
          // Logique conditionnelle pour l'émission d'images
          if ((this.type === 'exterior' || this.type === 'interior') && this.images.length === 15) {
            this.photos.emit(this.images);
          }
          if (this.type === 'details' && this.images.length === 2) {
            this.photos.emit(this.images);
          }
        }).then(() => {
        this.currentPhoto++;
      })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
