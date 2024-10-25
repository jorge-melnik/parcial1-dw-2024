import { computed, inject, Injectable } from '@angular/core';
import { Task, TaskPost } from '../interfaces/tasks';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UrlService } from './url.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _httpClient = inject(HttpClient);
  private _urlService = inject(UrlService);
  private _authService = inject(AuthService);

  private _usuario = this._authService.usuario;
  private baseAllUrl = this._urlService.backUrl + 'tareas/';

  // private baseMyUrl = computed(() => {
  //   return `${this._urlService.backUrl}usuario/${this._usuario()?.id_usuario}/`;
  // });

  private get baseMyUrl() {
    return `${this._urlService.backUrl}usuarios/${this._usuario()?.id_usuario}/tareas/`;
  }
  // private baseMyUrl = this._urlService.backUrl + 'usuarios/';

  // private get baseMyUrl() {}

  async getAllTasks(): Promise<Task[]> {
    return firstValueFrom(this._httpClient.get<Task[]>(this.baseAllUrl));
  }

  async getTaskById(id_tarea: number): Promise<Task | undefined> {
    return firstValueFrom(
      this._httpClient.get<Task>(this.baseAllUrl + id_tarea),
    );
  }

  async createTask(task: TaskPost): Promise<Task> {
    return firstValueFrom(this._httpClient.post<Task>(this.baseMyUrl, task));
  }
}
