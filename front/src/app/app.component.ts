import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/servicios/auth.service';
import { Usuario } from './shared/interfaces/usuario';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private _authService = inject(AuthService);
  public usuario?: Usuario;

  async ngOnInit() {
    this.usuario = this._authService.user;
  }
}
