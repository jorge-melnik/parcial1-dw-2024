import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DivisorDirective } from '../../../../core/directivas/divisor.directive';
import { TakenDirective } from '../../../../core/directivas/taken.directive';
import { TaskPost } from '../../../../shared/interfaces/tasks';

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
    taskForm.form.markAllAsTouched();

    if (taskForm.valid) {
      this.save.emit(this.task);
      console.log('Emitido: ', { task: this.task });
    } else {
      console.error('Formulario no valido.');
    }
  }
}
