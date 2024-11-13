import { Component, inject, input, OnInit } from '@angular/core';
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
import { cloudUploadOutline, saveOutline } from 'ionicons/icons';
import { UsuarioService } from '../../../shared/servicios/usuario.service';
import { Router } from '@angular/router';

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
export class UsuarioImagenComponent implements OnInit {
  private _usuarioService = inject(UsuarioService);
  private _imageBlob: Blob | null | undefined = undefined;
  private _router = inject(Router);
  public id_usuario = input.required<string>();

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer) {
    addIcons({ cloudUploadOutline, saveOutline });
  }
  ngOnInit(): void {
    console.log({ id_usuario: this.id_usuario() });
  }

  fileChangeEvent(event: Event): void {
    console.log('fileChangeEvent');
    this.imageChangedEvent = event;
  }
  
  imageCropped(event: ImageCroppedEvent) {
    console.log('imageCropped');
    if (!event.objectUrl) return;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    console.log({ cropped: this.croppedImage });
    // event.blob can be used to upload the cropped image
    this._imageBlob = event.blob;
    console.log({ blob: this._imageBlob });
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
  async save() {
    console.log('save');
    try {
      if (!this._imageBlob) return;
      await this._usuarioService.uploadImage(
        parseInt(this.id_usuario()),
        this._imageBlob,
      );
      this._imageBlob = null;
      this._router.navigate(['usuarios']);
    } catch (error: any) {
      console.error(error);
    }
  }
}
