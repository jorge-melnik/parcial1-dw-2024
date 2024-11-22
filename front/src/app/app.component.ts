import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/servicios/auth.service';
import { JsonPipe } from '@angular/common';
import {
  IonRouterOutlet,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonLabel,
  IonRow,
  IonCol,
  IonGrid,
  IonApp,
} from '@ionic/angular/standalone';
import { UrlService } from './shared/servicios/url.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,
    IonGrid,
    IonCol,
    IonRow,
    IonLabel,
    IonFooter,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonFooter,
    IonRouterOutlet,
    IonApp,
    RouterModule,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private _authService = inject(AuthService);
  private _urlService = inject(UrlService);

  get backUrl() {
    return this._urlService.backUrl;
  }

  get usuario() {
    return this._authService.usuario;
  }

  recargarPagina() {
    window.location.href = 'https://parcial.desaweb.ucu.edu.uy';
  }
}
