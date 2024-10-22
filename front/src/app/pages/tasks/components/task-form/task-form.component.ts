import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskPost } from '../../../../interfaces/tasks';
import { JsonPipe } from '@angular/common';
import { TakenDirective } from '../../../../directivas/taken.directive';
import { DivisorDirective } from '../../../../directivas/divisor.directive';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, JsonPipe, TakenDirective, DivisorDirective],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  public task: TaskPost = { duracion: 0, nombre: '' };
  public save = output<TaskPost>();

  public onSubmit(taskForm: NgForm) {
    console.log({ taskForm });
    console.log('TASK: ', { task: this.task });
    taskForm.form.markAllAsTouched();

    if (taskForm.valid) {
      this.save.emit(this.task);
      console.log('Emitido: ', { task: this.task });
    } else {
      console.error('Formulario no valido.');
    }
  }
}
