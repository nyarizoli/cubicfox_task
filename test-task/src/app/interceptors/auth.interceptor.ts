import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_KEY } from '../utils/constants/keys/authentication/authentication.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api')) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`)
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
