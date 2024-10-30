import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../componentes/usuario-form/usuario-form.component';

@Component({
  standalone: true,
  imports: [UsuarioFormComponent],
  templateUrl: './usuario-crear.page.html',
  styleUrl: './usuario-crear.page.css',
})
export class UsuarioCrearPageComponent {}
