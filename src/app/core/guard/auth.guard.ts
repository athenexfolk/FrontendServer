import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorityService } from '../auth/authority.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authority = inject(AuthorityService)
  if(authority.isLoggedin) return true
  let router = inject(Router)
  router.navigate(['/auth','login'])
  return false;
};
