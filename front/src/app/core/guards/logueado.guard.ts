import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/servicios/auth.service';

export const logueadoGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const _authService = inject(AuthService);
  if (!_authService.tokenLoadFinish) {
    await _authService.loadToken();
  }

  if (_authService.usuario()) return true;
  router.navigate(['/auth/login']);
  return false;
};
