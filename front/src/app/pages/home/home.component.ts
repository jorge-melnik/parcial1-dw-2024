import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskComponent } from '../../task/task.component';
import { SearchComponent } from '../../search/search.component';
import { TasksService } from '../../servicios/tasks.service';
import { Task } from '../../interfaces/tasks';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent, SearchComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  taskService = inject(TasksService);
  task?: Task;
  taskList: Task[] = [];

  public async ngOnInit() {
    this.taskList = await this.taskService.getAllTasks();
    console.log({ tareas: this.taskList });
  }

  public async valorRecibido(valorRecibido: string) {
    console.log({ valorRecibido });
    this.task = await this.taskService.getTaskById(parseInt(valorRecibido));
  }
}
