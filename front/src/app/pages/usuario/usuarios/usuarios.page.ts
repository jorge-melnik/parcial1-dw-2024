import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonCardContent,
  IonCard,
  IonList,
  IonContent,
  IonItem,
  IonAvatar,
  IonTitle,
  IonLabel,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/angular/standalone';
import { Usuario } from '../../../shared/interfaces/usuario';
import { UsuarioService } from '../../../shared/servicios/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    IonLabel,
    IonTitle,
    IonAvatar,
    IonItem,
    IonContent,
    IonList,
    IonCard,
    IonCardContent,
    IonToolbar,
    IonHeader,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    RouterLink,
  ],
  templateUrl: './usuario.page.html',
  styleUrl: './usuario.page.css',
})
export class UsuariosPageComponent implements OnInit {
  private _usuariosService = inject(UsuarioService);
  public usuarios: Usuario[] = [];

  async ngOnInit() {
    this.usuarios = await this._usuariosService.getAllUsuarios();
  }
}
