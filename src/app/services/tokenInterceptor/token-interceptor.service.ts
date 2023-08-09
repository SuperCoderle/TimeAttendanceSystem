import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { LoginService } from '../loginService/login.service';
import { Token } from 'src/app/models/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.getToken().token) {
      request = this.addToken(request, this.loginService.getToken().token!);
    }

    return next.handle(request).pipe(catchError(err => {
      switch(err.status)
      {
        case 401:
          this.handle401Error(request, next);
          break;
        case 403:
          this.router.navigate(['error/403']);
          break;
        case 404:
          this.router.navigate(['error/404']);
          break;
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.log(err);
      return throwError(error);
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      
      this.loginService.refreshToken().subscribe(
        {
          next: (result) => {
            this.loginService.storeToken(result);
            this.isRefreshing = false;
            this.refreshTokenSubject.next(result.token);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          }
        }
      )
     
      return next.handle(this.addToken(request, this.loginService.getToken().token));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
