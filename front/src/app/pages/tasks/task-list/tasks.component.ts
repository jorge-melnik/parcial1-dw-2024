import { Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TasksService } from '../../../shared/servicios/tasks.service';
import { Task } from '../../../shared/interfaces/tasks';

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
    console.log('TasksComponent ON INIT');
    const listado = await this._taskService.getAllTasks();
    this.taskList.set(listado);
  }
}
