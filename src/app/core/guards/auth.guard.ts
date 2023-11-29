import { CanActivateFn, Router } from '@angular/router';
import { AuthorityService } from '../auth/authority.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authority = inject(AuthorityService);
  const router = inject(Router);

  if (!authority.isLoggedin) {
    router.navigate(['/auth/signin']);
    return false;
  }
  return true;
};
