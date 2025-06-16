import { HttpHandlerFn, HttpInterceptorFn, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/Auth/auth.service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next.handle(req);
}; */
@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Inject the current AuthService and use it to get an authentication token:

    const authToken = this.authService.getAuthToken();
    // Clone the request to add the authentication header.
    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${authToken}` /* 'X-Authentication-Token', `${authToken}` */),
    });
    console.log(req)
    return next.handle(req);



  }


}
/* export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current AuthService and use it to get an authentication token:

  const authToken = inject(AuthService).getAuthToken();
  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
} */