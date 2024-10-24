import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../interfaces/tasks';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _apiService = inject(ApiService);
  private _httpClient = inject(HttpClient);

  async getAllTasks(): Promise<Task[]> {
    // return this._apiService.get<Task[]>('tareas');
    console.log('HTTP CLIENT');
    return firstValueFrom(
      this._httpClient.get<Task[]>('http://localhost/back/tareas/'),
    );
  }
  async getTaskById(id_tarea: number): Promise<Task | undefined> {
    return this._apiService.get<Task>('tareas/' + id_tarea);
  }
}
