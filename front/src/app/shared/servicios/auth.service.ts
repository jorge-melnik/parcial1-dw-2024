import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _urlService = inject(UrlService);
  private _baseUrl = '';
  private _token?: string;
  private _user?: Usuario;

  constructor() {
    this._baseUrl = this._urlService.backUrl + 'auth/';
    console.log({ _baseUrl: this._baseUrl });
  }

  get user(): Usuario | undefined {
    return this._user;
  }

  get token(): string | undefined {
    return this._token;
  }

  async doLogin(username: string, contraseña: string) {
    const url = this._baseUrl;
    const body = { username, contraseña };
    const response = await firstValueFrom(
      this._httpClient.post<{ token: string }>(url, body),
    );
    this._token = response.token;
    const responseUsuario = await firstValueFrom(
      this._httpClient.get<Usuario>(url),
    );
    this._user = responseUsuario;
    return true;
    // this._apiService.setApiToken(response.token);
  }
}
