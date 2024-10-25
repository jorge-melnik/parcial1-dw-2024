import { Component, inject } from '@angular/core';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { TasksService } from '../../../shared/servicios/tasks.service';
import { Task, TaskPost } from '../../../shared/interfaces/tasks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [TaskFormComponent],
  templateUrl: './task-create.page.html',
  styleUrl: './task-create.page.css',
})
export class TaskCreatePageComponent {
  private _taskService = inject(TasksService);
  private _router = inject(Router);

  async createTask(task: TaskPost) {
    try {
      const newTask: Task = await this._taskService.createTask(task);
      console.info({ newTask });
      this._router.navigate(['/tasks']);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
