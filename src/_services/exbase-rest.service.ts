import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../environments/environment';

const TOKEN_HEADER_KEY = 'Authorization';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Client-Id': 'exbase',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ExbaseRestService {
  exAccountId = 'r3ZeEHZrxpZBlvy0Y8vu';

  constructor(private http: HttpClient, private  tokenStorageService: TokenStorageService) {}

  get(api: string, params: any): Observable<any> {
    return this.http.get(api, httpOptions)
  }

  post(api: string, params: any): Observable<any> {
    const data = JSON.stringify(params);
    return this.http.post(api, data, httpOptions);
  }

  delete() {}

  put() {}

}
