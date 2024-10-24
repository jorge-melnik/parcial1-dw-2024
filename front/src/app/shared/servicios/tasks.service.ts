import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../interfaces/tasks';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _httpClient = inject(HttpClient);
  private _urlService = inject(UrlService);
  private baseUrl = this._urlService.backUrl + 'tareas/';

  async getAllTasks(): Promise<Task[]> {
    return firstValueFrom(this._httpClient.get<Task[]>(this.baseUrl));
  }
  async getTaskById(id_tarea: number): Promise<Task | undefined> {
    return firstValueFrom(this._httpClient.get<Task>(this.baseUrl + id_tarea));
  }
}
