import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { Usuario } from '../interfaces/usuario';

export const logueadoGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const _apiService = inject(ApiService);
  console.log({ state });

  try {
    const usuario = await _apiService.get<Usuario>('auth/');
    console.log({ usuario });
    return true;
  } catch (error: any) {
    console.log(
      'Para accecder a ' + state.url + ' tienes que estar autenticado.',
    );
    router.navigate(['/auth/login']);
  }
  return false;
};
