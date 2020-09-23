import { Injectable } from '@angular/core';
import { Departament } from './models/departament.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  private departaments: Departament[] = [{
    id: 1, name: "Clothing"
  }, {
    id: 2, name: "Books"
  }, {
    id: 3, name: "Eletronics"
  }, {
    id: 4, name: "Computer"
  }, {
    id: 5, name: "Car"
  }]

  private nextID?: number = 5

  constructor() { }

  getDepartament(): Departament[] {
    console.log(this.departaments)
    return this.departaments;
  }

  addDepartament(d: Departament) {
    this.departaments.push(d)

  }

  getDepartamentById(id: number): Departament {
    var dp = this.departaments.find(x => x.id == id)    
    return dp;
  }
}
