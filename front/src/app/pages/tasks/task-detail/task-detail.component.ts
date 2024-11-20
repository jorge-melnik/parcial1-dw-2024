import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  id_tarea = input<number>();

  ngOnInit(): void {
    console.log({ id_tarea: this.id_tarea() });
  }
}
