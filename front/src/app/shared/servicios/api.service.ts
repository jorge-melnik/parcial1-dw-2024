import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _baseRestUrl: string = `${window.location.origin}/back`;

  private apiToken: string | null = null;

  constructor() {
    console.log('BASE URL: ', this._baseRestUrl);
  }

  get baseRestUrl() {
    return this._baseRestUrl;
  }

  public setApiToken(token: string | null) {
    this.apiToken = token;
  }

  private get headers(): HeadersInit {
    if (!this.apiToken) {
      return {
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok || (response.status >= 400 && response.status <= 499)) {
      //Si no se pudo completar la solicitud
      const data = await response.json();
      if (response.status === 401) {
        //Redireccionar a autenticación.
        console.error(data.message);
        throw new Error(data.message);
        //TODO: Agregar return?
      }
      throw new Error(data.message);
    }

    if (response.status === 204) {
      console.error('handler response no puede procesar un 204.');
      throw new Error('hanldeResponse no puede procesar un 204.');
    }

    if (response.status >= 200 && response.status <= 299) {
      //Esto es una respuesta Correcta!
      const data = await response.json();
      return data as T;
    }
    throw new Error('Caso no considerado.');
  }

  private async handle204Response(response: Response): Promise<void> {
    if (response.status === 204) {
      return;
    }
    await this.handleResponse(response);
  }

  public async get<T>(endpoint: string): Promise<T> {
    const url = `${this._baseRestUrl}/${endpoint}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });

    return this.handleResponse(res);
  }

  public async delete(endpoint: string): Promise<void> {
    const url = `${this._baseRestUrl}/${endpoint}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: this.headers,
    });
    await this.handle204Response(res);
  }

  public async put(endpoint: string, datos: string): Promise<void> {
    const url = `${this._baseRestUrl}/${endpoint}`;
    const opciones = {
      headers: this.headers,
      method: 'PUT',
      body: datos,
    };
    const res = await fetch(url, opciones);
    await this.handle204Response(res);
  }

  public async post<T>(endpoint: string, datos: string): Promise<T> {
    const url = `${this._baseRestUrl}/${endpoint}`;
    const opciones = {
      headers: this.headers,
      method: 'POST',
      body: datos,
    };
    const res = await fetch(url, opciones);
    return this.handleResponse(res);
  }
}
