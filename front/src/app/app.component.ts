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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonFooter,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonFooter,
    IonRouterOutlet,
    RouterModule,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private _authService = inject(AuthService);

  get usuario() {
    return this._authService.usuario;
  }
}
