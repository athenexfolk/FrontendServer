import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('betaToken')) return true
  let router = inject(Router)
  router.navigate(['auth','login'])
  return false;
};
