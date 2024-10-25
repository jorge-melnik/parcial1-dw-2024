import { Component, input } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { Task } from '../../../../shared/interfaces/tasks';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    IonItem,
    IonList,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    JsonPipe,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  public task = input.required<Task>();
}
