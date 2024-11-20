import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/servicios/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService);
  const token = _authService.token;

  if (!token) {
    return next(req);
  }
  const reqWithHeader = req.clone({
    headers: req.headers.append('Authorization', 'Bearer ' + token),
  });
  return next(reqWithHeader);
};
