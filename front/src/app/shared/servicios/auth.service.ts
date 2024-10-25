import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { UrlService } from './url.service';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

const TOKEN_KEY = 'TOKEN';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _urlService = inject(UrlService);
  private _baseUrl = '';
  private _token?: string;

  tokenLoadFinish = false;

  public usuario = signal<Usuario | undefined>(undefined);

  constructor() {
    this._baseUrl = this._urlService.backUrl + 'auth/';
  }

  private saveToken(token: string) {
    this._token = token;
    localStorage.removeItem(TOKEN_KEY);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    this.tokenLoadFinish = true;
  }

  public async loadToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this._token = token;
      const responseUsuario = await firstValueFrom(
        this._httpClient.get<Usuario>(this._baseUrl),
      );
      this.usuario.set(responseUsuario);
    }
    this.tokenLoadFinish = true;
  }

  get token(): string | undefined {
    return this._token;
  }

  async doLogin(username: string, contraseña: string) {
    const body = { username, contraseña };
    const response = await firstValueFrom(
      this._httpClient.post<{ token: string }>(this._baseUrl, body),
    );
    this._token = response.token;
    const responseUsuario = await firstValueFrom(
      this._httpClient.get<Usuario>(this._baseUrl),
    );
    this.usuario.set(responseUsuario);
    this.saveToken(response.token);

    return true;
    // this._apiService.setApiToken(response.token);
  }
}
