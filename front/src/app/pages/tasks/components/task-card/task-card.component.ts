import { Component, input } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonContent,
} from '@ionic/angular/standalone';
import { Task } from '../../../../shared/interfaces/tasks';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonList,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    JsonPipe,
    IonContent,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  public task = input.required<Task>();
}
