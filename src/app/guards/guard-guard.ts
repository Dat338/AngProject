import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accesstoken = localStorage.getItem('accessToken');
  if (accesstoken == null) {
    router.navigate(['/login']);
    return false;
  }
 
  return true;
}

