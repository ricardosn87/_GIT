import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Department } from './department';
import { delay, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = "http://localhost:3000/departments";

  private departmentSubject$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
  private loaded: boolean = false

  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
    if (!this.loaded) {
      this.http.get<Department[]>(this.url)
        .pipe(
          tap((dps) => console.log(dps)),
          delay(1000)
          )
        .subscribe(this.departmentSubject$);
      this.loaded = true;
    }
    return this.departmentSubject$.asObservable()
  }


  add(d: Department): Observable<Department> {

   
    return this.http.post<Department>(this.url, d)
      .pipe(
        tap((dep: Department) => this.departmentSubject$.getValue().push(dep))
      )
  }

  del(dep: Department): Observable<any> {
    return this.http.delete(this.url + "/" + dep._id)
      .pipe(
        tap(() => {
          let departaments = this.departmentSubject$.getValue();
          let i = departaments.findIndex(d => d._id === dep._id);
          if (i > 0)
            departaments.splice(i, 1)
        })
      )
  }

  update(dep: Department): Observable<Department> {
    return this.http.patch<Department>(this.url + "/" + dep._id, dep)
      .pipe(
        tap((dep) => {
          let departament = this.departmentSubject$.getValue();
          let i = departament.findIndex(d => d._id === dep._id);
          if (i > 0) {
            departament[i].name = dep.name
          }
        })
      )
  }
}
