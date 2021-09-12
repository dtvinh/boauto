import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Client-Id': 'boauto',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor() { }
}
