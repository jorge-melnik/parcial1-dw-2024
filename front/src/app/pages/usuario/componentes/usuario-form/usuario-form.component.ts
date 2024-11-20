import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonCardContent,
  IonCardSubtitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { ErrorMessagePipe } from '../../../../shared/pipes/error-message.pipe';
import { UsuarioPost } from '../../../../shared/interfaces/usuario';
import {
  freeEmail,
  valueMatchWith,
} from '../../../../shared/validators/my.validators';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardSubtitle,
    IonCardContent,
    ReactiveFormsModule,
    ErrorMessagePipe,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  public usuarioForm: FormGroup;
  public created = output<UsuarioPost>();

  constructor() {
    this.usuarioForm = new FormGroup({
      username: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(3)],
      }),
      contraseña: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      contraseña2: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, valueMatchWith('contraseña')],
      }),
      email: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
        asyncValidators: [freeEmail()],
      }),
      email2: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.email,
          valueMatchWith('email'),
        ],
        asyncValidators: [freeEmail()],
      }),
    });
  }

  public onSubmit() {
    this.usuarioForm.markAllAsTouched();
    if (!this.usuarioForm.valid) return;
    const valores = this.usuarioForm.value;
    this.created.emit({
      username: valores.username,
      email: valores.email,
      contraseña: valores.contraseña,
      contraseña2: valores.contraseña2,
    });
  }
}
