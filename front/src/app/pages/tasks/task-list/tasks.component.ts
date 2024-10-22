import { Component, inject, OnInit, signal } from '@angular/core';
import { TasksService } from '../../../servicios/tasks.service';
import { Task } from '../../../interfaces/tasks';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [JsonPipe, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  private _taskService = inject(TasksService);

  public taskList = signal<Task[]>([]);

  async ngOnInit(): Promise<void> {
    const listado = await this._taskService.getAllTasks();
    this.taskList.set(listado);
  }
}
