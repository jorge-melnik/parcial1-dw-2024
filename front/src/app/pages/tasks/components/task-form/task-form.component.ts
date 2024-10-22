import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskPost } from '../../../../interfaces/tasks';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  public task: TaskPost = { duracion: 0, nombre: '' };
  public save = output<TaskPost>();

  public onSubmit(taskForm: NgForm) {
    console.log({ taskForm });
    taskForm.form.markAllAsTouched();

    if (taskForm.valid) {
      this.save.emit(this.task);
      console.log('Emitido: ', { task: this.task });
    } else {
      console.error('Formulario no valido.');
    }
  }
}
