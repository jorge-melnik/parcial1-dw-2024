import { Component } from '@angular/core';
import { TaskFormComponent } from '../components/task-form/task-form.component';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [TaskFormComponent],
  templateUrl: './task-create.page.html',
  styleUrl: './task-create.page.css',
})
export class TaskCreatePageComponent {}
