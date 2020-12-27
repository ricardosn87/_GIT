import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = "http://localhost:9000/auth"

  usuario = new User('', '', '', '', '', '', '', '', '', '')

  private subjectUser$: BehaviorSubject<User> = new BehaviorSubject<User>(this.usuario);
  private subjectLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/register', user)
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(this.url + '/login', credentials)
      .pipe(
        tap((u: User) => {
          localStorage.setItem('token', u.token);
          this.subjectLoggedIn$.next(true)
          this.subjectUser$.next(u);
        })
      )
  }

  isAuthenticated(): Observable<boolean> {
    return this.subjectLoggedIn$.asObservable()
  }



  getUser(): Observable<User> {
    return this.subjectUser$.asObservable()
  }
  logout() {
    localStorage.removeItem('token')
    this.subjectLoggedIn$.next(false)
    this.subjectUser$.next(this.usuario)
  }
}
