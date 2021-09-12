import { Injectable } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { TokenStorageService } from 'src/_services/token-storage.service';
import { AuthService } from 'src/_services/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const clientType = this.getClientId(authReq);
    const token = this.tokenStorageService.getToken(clientType);

    if (token != null) {
      authReq = this.addTokenHeader(req, token)
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/auth/token') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const clientType = this.getClientId(request);
      const token = this.tokenStorageService.getRefreshToken(clientType);

      if (token)
        if (clientType === 'exbase') {
          return this.authService.refreshTokenTrading(token).pipe(
            switchMap((response: any) => {
              this.isRefreshing = false;
              this.tokenStorageService.saveToken(response.d.access_token, clientType);
              this.tokenStorageService.saveRefreshToken(response.d.refresh_token, clientType);
              this.refreshTokenSubject.next(response.d.access_token);

              return next.handle(this.addTokenHeader(request, response.d.access_token));
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.tokenStorageService.signOut();
              return throwError(err);
            })
          );
        } else {
          return this.authService.getRefreshToken(token).pipe(
            switchMap((response: any) => {
              this.isRefreshing = false;
              this.tokenStorageService.saveToken(response.data.access_token, clientType);
              this.tokenStorageService.saveRefreshToken(response.data.refresh_token, clientType);
              this.refreshTokenSubject.next(response.data.access_token);

              return next.handle(this.addTokenHeader(request, response.d.access_token));
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.tokenStorageService.signOut();
              return throwError(err);
            })
          );
        }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }

  private getClientId(request: HttpRequest<any>){
    return request.headers.get('client-id') === 'exbase' ? 'exbase' : 'boauto';
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
