import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _apiService = inject(ApiService);

  async getAllTasks(): Promise<Task[]> {
    return this._apiService.get<Task[]>('tareas');
  }
  async getTaskById(id_tarea: number): Promise<Task | undefined> {
    return this._apiService.get<Task>('tareas/' + id_tarea);
  }
}
