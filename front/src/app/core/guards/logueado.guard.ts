import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Usuario } from '../../shared/interfaces/usuario';
import { AuthService } from '../../shared/servicios/auth.service';

export const logueadoGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const _authService = inject(AuthService);
  console.log({ state });
  const usuario: Usuario | undefined = _authService.usuario();

  if (usuario) return true;
  router.navigate(['/auth/login']);
  return false;
};
