import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-container',
  templateUrl: './ng-container.component.html',
  styleUrls: ['./ng-container.component.css']
})
export class NgContainerComponent implements OnInit {

  users = [
    {login: "bob",role: "admin",lastLogin: new Date('2/1/2018')},
    {login: "lia",role: "user",lastLogin: new Date('3/3/2018')},
    {login: "joao",role: "admin",lastLogin: new Date('4/4/2018')},
    {login: "robin",role: "user",lastLogin: new Date('5/5/2018')}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
