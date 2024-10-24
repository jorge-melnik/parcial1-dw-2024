import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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
