import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorityService } from '../auth/authority.service';

export const reverseAuthGuard: CanActivateFn = (route, state) => {
  const authority = inject(AuthorityService);
  const router = inject(Router);

  if (authority.isLoggedin) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
