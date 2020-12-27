import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Person } from './person';
import { Product } from './product';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly url = "http://localhost:9000/api/"
  constructor(private http: HttpClient) { }

  getPeoples(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`)
      .pipe(
       
        catchError((e) => {
       
          return throwError(e);
        })
      )
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`)
      .pipe(
       
        catchError((e) => {
         
          return throwError(e);
        })
      )
  }
}
