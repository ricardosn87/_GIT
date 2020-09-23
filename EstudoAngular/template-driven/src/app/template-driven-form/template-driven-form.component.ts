import { Component, OnInit } from '@angular/core';

interface Client {
  firstName: string
  lastName: string
  birth: Date
  gender: string
  street: string
  city: string
  state: string
  phone1: string
  phone2: string
}


@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})



export class TemplateDrivenFormComponent implements OnInit {

  client: Client = {
    firstName: "", lastName: "", birth: new Date(), gender: "", street: "", city: "", state: "", phone1: "", phone2: ""
  }

  states = [{ state: 'SP' },
  { state: 'PR' },
  { state: 'SC' },
  { state: 'RS' },
  { state: 'PA' },
  { state: 'RO' },
  { state: 'MA' }]

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.client)
  }

}
