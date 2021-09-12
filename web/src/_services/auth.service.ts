import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginToExbase(email: string, password: string, captcha: string): Observable<any> {
    return this.http.post('api/auth/auth/token',
      { email, password, captcha, grant_type: 'password', client_id: 'exbase-web' },
      httpOptions
    );
  }

  refreshTokenTrading(refresh_token: string) {
    return this.http.post(
      'api/auth/auth/token',
      { refresh_token, grant_type: 'refresh_token', client_id: 'exbase-web' },
      httpOptions
    );
  }

  createSession(username: string, password: string): Observable<any> {
    return this.http.post('api/v1/sessions',
      { username, password },
      httpOptions
    );
  }

  getRefreshToken(refresh_token: string) {
    return this.http.post('api/v1/tokens',
      { refresh_token: refresh_token},
      httpOptions
    );
  }

}
