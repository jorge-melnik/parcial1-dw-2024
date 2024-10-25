import { Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TasksService } from '../../../shared/servicios/tasks.service';
import { Task } from '../../../shared/interfaces/tasks';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import {
  IonContent,
  IonFabButton,
  IonFab,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonContent,
    JsonPipe,
    RouterLink,
    TaskCardComponent,
  ],
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
