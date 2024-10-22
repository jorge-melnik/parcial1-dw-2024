import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../servicios/api.service';
import { Router } from '@angular/router';

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

  _apiService = inject(ApiService);
  _router = inject(Router);

  async onSubmit() {
    const body = {
      username: this.username,
      contraseña: this.password,
    };
    try {
      const response = await this._apiService.post<{ token: string }>(
        'auth/',
        JSON.stringify(body),
      );
      console.log({ response });
      this._apiService.setApiToken(response.token);
      this._router.navigate(['/home']);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}
