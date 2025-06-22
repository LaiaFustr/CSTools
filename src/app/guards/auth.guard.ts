import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('jwt') != null) {
    return true;
  }

  return router.parseUrl('/login');
};
/* export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('jwt') != null) {
    return true;
  }
  return false;
}; */
