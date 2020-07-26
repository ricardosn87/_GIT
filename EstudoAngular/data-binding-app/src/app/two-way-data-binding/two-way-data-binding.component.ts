import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-data-binding',
  templateUrl: './two-way-data-binding.component.html',
  styleUrls: ['./two-way-data-binding.component.css']
})
export class TwoWayDataBindingComponent implements OnInit {

  name1:string = ""
  name2:string = ""

  person = {
    firstname:"danilo",
    lastname: "bro",
    age:50,
    address: "route 100"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
