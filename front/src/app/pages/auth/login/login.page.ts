import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/servicios/auth.service';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonInput,
    IonContent,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    FormsModule,
    IonCard,
    IonInputPasswordToggle,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPageComponent {
  username = signal('');
  password = signal('');
  errorMessage = signal('');

  _authService = inject(AuthService);
  _router = inject(Router);

  async onSubmit(form: NgForm) {
    console.log('onSubmit');
    this.errorMessage.set('');
    form.form.markAllAsTouched();

    if (!form.valid) return;
    try {
      const respuesta = await this._authService.doLogin(
        this.username(),
        this.password(),
      );
      if (respuesta) {
        //Si se hizo login OK.
        this._router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error(error.message);
      this.errorMessage.set(error.message);
    }
  }
}
