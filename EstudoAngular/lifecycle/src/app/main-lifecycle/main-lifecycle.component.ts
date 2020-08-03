import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Client } from './../client';

@Component({
  selector: 'app-main-lifecycle',
  templateUrl: './main-lifecycle.component.html',
  styleUrls: ['./main-lifecycle.component.css']
})
export class MainLifecycleComponent implements OnInit {

  foods: string[] = ["Rice", "Beans", "Pizza"]
  clients: Client[] = []

  name: string;
  age: number;
  food: string

  editClient: number = -1

  randomNumber: number

  constructor() {
    this.generateRandomNumber();
  }
  generateRandomNumber() {
    this.randomNumber = Math.round(Math.random() * 1000)
  }

  ngOnInit(): void {
  }

  save() {
    if (this.editClient == -1) {
      this.clients.push({ name: this.name, age: this.age, food: this.food })
    } else {
      this.clients[this.editClient].name = this.name
      this.clients[this.editClient].age = this.age
      this.clients[this.editClient].food = this.food
      this.editClient = -1
    }


    this.name = null;
    this.age = 0;
    this.food = null;
  }

  remove(i: number) {
    this.clients.splice(i, 1)
  }
  edit(i: number) {
    this.name = this.clients[i].name;
    this.age = this.clients[i].age;
    this.food = this.clients[i].food;
    this.editClient = i
  }

}
