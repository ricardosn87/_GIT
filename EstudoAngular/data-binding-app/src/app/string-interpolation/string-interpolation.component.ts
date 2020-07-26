import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-interpolation',
  templateUrl: './string-interpolation.component.html',
  styleUrls: ['./string-interpolation.component.css']
})
export class StringInterpolationComponent implements OnInit {

  firstname = "ricardo"
  age: 100
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
