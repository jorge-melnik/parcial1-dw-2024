import { Component, input } from '@angular/core';
import { Usuario } from '../../../shared/interfaces/usuario';
import { JsonPipe } from '@angular/common';
import {
  ImageCropperComponent,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonLabel,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-usuario-imagen',
  standalone: true,
  imports: [
    IonLabel,
    IonContent,
    IonCol,
    IonRow,
    IonGrid,
    IonInput,
    IonButton,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonIcon,
    JsonPipe,
    IonCardSubtitle,
    ImageCropperComponent,
  ],
  templateUrl: './usuario-imagen.component.html',
  styleUrl: './usuario-imagen.component.css',
})
export class UsuarioImagenComponent {
  public usuario = input.required<Usuario>();

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer) {
    addIcons({ cloudUploadOutline });
  }

  fileChangeEvent(event: Event): void {
    console.log('fileChangeEvent');
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log('imageCropped');
    if (!event.objectUrl) return;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
    console.log('imageLoaded', image);
  }
  cropperReady() {
    // cropper ready
    console.log('cropperReady');
  }
  loadImageFailed() {
    // show message
    console.log('loadImageFailed');
  }
}
