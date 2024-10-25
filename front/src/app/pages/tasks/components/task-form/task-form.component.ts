import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DivisorDirective } from '../../../../core/directivas/divisor.directive';
import { TakenDirective } from '../../../../core/directivas/taken.directive';
import { TaskPost } from '../../../../shared/interfaces/tasks';
import {
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonButton,
  IonContent,
  IonInput,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    IonItem,
    IonList,
    IonInput,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    FormsModule,
    JsonPipe,
    TakenDirective,
    DivisorDirective,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  public save = output<TaskPost>();

  public onSubmit(taskForm: NgForm) {
    taskForm.form.markAllAsTouched();

    if (taskForm.valid) {
      this.save.emit(taskForm.value);
      console.log('Emitido: ', { task: taskForm.value });
    } else {
      console.error('Formulario no valido.');
    }
  }
}
