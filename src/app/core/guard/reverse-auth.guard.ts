import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthorityService } from '../auth/authority.service';
import { Location } from '@angular/common';

export const reverseAuthGuard: CanActivateFn = (route, state) => {
  let authority = inject(AuthorityService)
  if(!authority.isLoggedin) return true
  let location = inject(Location)
  location.back()
  return false;
};
