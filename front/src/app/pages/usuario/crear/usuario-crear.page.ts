import { Component, inject } from '@angular/core';
import { UsuarioFormComponent } from '../componentes/usuario-form/usuario-form.component';
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/angular/standalone';
import { Usuario, UsuarioPost } from '../../../shared/interfaces/usuario';
import { UsuarioService } from '../../../shared/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonContent, IonCol, IonRow, IonGrid, UsuarioFormComponent],
  templateUrl: './usuario-crear.page.html',
  styleUrl: './usuario-crear.page.css',
})
export class UsuarioCrearPageComponent {
  private _usuarioService = inject(UsuarioService);
  private _router = inject(Router);

  async onCreated(newUser: UsuarioPost) {
    try {
      const usuario_creado: Usuario =
        await this._usuarioService.createUsuario(newUser);
      console.info({ usuario_creado });
      this._router.navigate(['usuarios']);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
