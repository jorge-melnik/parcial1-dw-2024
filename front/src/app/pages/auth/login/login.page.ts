import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
  username = '';
  password = '';

  _authService = inject(AuthService);
  _router = inject(Router);

  async onSubmit() {
    try {
      const respuesta = await this._authService.doLogin(
        this.username,
        this.password,
      );
      if (respuesta) {
        //Si se hizo login OK.
        this._router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
