import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(
    private http: HttpClient,
  ) {}

  get(api: string, params: HttpParams = new  HttpParams()): Observable<any> {
    return this.http.get(api, Object.assign({}, httpOptions, { params }));
  }

  post(api: string, params: any): Observable<any> {
    const data = JSON.stringify(params);
    return this.http.post(api, data, httpOptions);
  }

  delete() {}

  put() {}
}
