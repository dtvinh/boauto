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
    window.localStorage.clear();
  }

  public saveToken(token: string, tradingType = ''): void {
    const key = (tradingType.length === 0) ? TOKEN_KEY : `${tradingType}_${TOKEN_KEY}`;
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, token);
  }

  public saveRefreshToken(token: string, tradingType = ''): void {
    const key = (tradingType.length === 0) ? TOKEN_KEY : `${tradingType}_${REFRESH_TOKEN_KEY}`;
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, token);
  }

  public getToken(tradingType = ''): string | null {
    const key = (tradingType.length === 0) ? TOKEN_KEY : `${tradingType}_${TOKEN_KEY}`;
    return window.localStorage.getItem(key);
  }

  public getRefreshToken(tradingType = ''): string | null {
    const key = (tradingType.length === 0) ? REFRESH_TOKEN_KEY : `${tradingType}_${REFRESH_TOKEN_KEY}`;
    return window.localStorage.getItem(key);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
