import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Usuario, UsuarioPost } from '../interfaces/usuario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _httpClient = inject(HttpClient);
  private _urlService = inject(UrlService);

  private baseUrl = this._urlService.backUrl + 'usuarios/';

  async getAllUsuarios(): Promise<Usuario[]> {
    return firstValueFrom(this._httpClient.get<Usuario[]>(this.baseUrl));
  }

  async getUsuarioById(id_usuario: number): Promise<Usuario | undefined> {
    return firstValueFrom(
      this._httpClient.get<Usuario>(this.baseUrl + id_usuario),
    );
  }

  async createUsuario(task: UsuarioPost): Promise<Usuario> {
    return firstValueFrom(this._httpClient.post<Usuario>(this.baseUrl, task));
  }

  async uploadImage(id_usuario: number, image: Blob): Promise<Usuario> {
    const formData = new FormData();
    formData.append('imagen', image, 'image.webp');
    return firstValueFrom(
      this._httpClient.put<Usuario>(
        this.baseUrl + id_usuario + '/imagen',
        formData,
      ),
    );
  }
}
