import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let accessToken = localStorage.getItem('accessToken');


  const cloned = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${accessToken}`,
      'X-API-KEY': '51b12ec8-cf9d-4833-a849-9f575bde4d44'
    }
  });

  return next(cloned);
};