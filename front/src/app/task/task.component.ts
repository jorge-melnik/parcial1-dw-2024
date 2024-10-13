import { Component, input } from '@angular/core';
import { Task } from '../interfaces/tasks';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input<Task | undefined>(undefined);
}
