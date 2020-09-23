import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {


  clientForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    nameIn: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  })

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.clientForm.value)

    console.log(`Name: ${this.clientForm.value.firstName},
    lastName: ${this.clientForm.value.lastName}
    firstName: ${this.clientForm.value.nameIn.firstName}
    lastName: ${this.clientForm.value.nameIn.firstName}
    `)

  }
}
