import { Component, OnInit } from '@angular/core';
import { DepartamentService } from '../departament.service';

@Component({
  selector: 'app-departament-form',
  templateUrl: './departament-form.component.html',
  styleUrls: ['./departament-form.component.css']
})
export class DepartamentFormComponent implements OnInit {

  depName: string
  constructor(private departamentService: DepartamentService) { }

  ID():number {    
    return Date.now() ;
  };

  ngOnInit(): void {
  }

  save() {
    this.departamentService.addDepartament({id:this.ID() , name: this.depName })
    this.clear()
  }
  clear() {
       this.depName = ""
  }

}
