import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../interfaces/tasks';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  taskList: Task[] = [
    {
      id_tarea: 1,
      nombre: 'Tarea 1',
      duracion: 4,
      id_usuario: 2,
      creador: 'pepe',
      usuarios: ['pepe'],
    },
    {
      id_tarea: 2,
      nombre: 'Tarea 2',
      duracion: 4,
      id_usuario: 2,
      creador: 'pepe',
      usuarios: ['pepe'],
    },
    {
      id_tarea: 3,
      nombre: 'Tarea 3',
      duracion: 4,
      id_usuario: 2,
      creador: 'pepe',
      usuarios: ['pepe'],
    },
  ];

  task: Task = this.taskList[2];

  public valorRecibido(valorRecibido: string) {
    console.log({ valorRecibido });
  }
}
