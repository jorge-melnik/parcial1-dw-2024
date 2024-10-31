import { Component, input } from '@angular/core';
import { Usuario } from '../../../shared/interfaces/usuario';
import { JsonPipe } from '@angular/common';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-usuario-imagen',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './usuario-imagen.component.html',
  styleUrl: './usuario-imagen.component.css',
})
export class UsuarioImagenComponent {
  public usuario = input.required<Usuario>();
}
