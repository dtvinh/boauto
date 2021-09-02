import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string, tradingType = ''): void {
    const key = (tradingType.length === 0) ? TOKEN_KEY : `${tradingType}_${TOKEN_KEY}`;
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, token);
  }

  public saveRefreshToken(token: string, tradingType = ''): void {
    const key = (tradingType.length === 0) ? TOKEN_KEY : `${tradingType}_${REFRESH_TOKEN_KEY}`;
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, token);
  }

  public getToken(tradingType = ''): string | null {
    const key = (tradingType.length === 0) ? TOKEN_KEY : `${tradingType}_${TOKEN_KEY}`;
    return window.sessionStorage.getItem(key);
  }

  public getRefreshToken(tradingType = ''): string | null {
    const key = (tradingType.length === 0) ? REFRESH_TOKEN_KEY : `${tradingType}_${REFRESH_TOKEN_KEY}`;
    return window.sessionStorage.getItem(key);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
