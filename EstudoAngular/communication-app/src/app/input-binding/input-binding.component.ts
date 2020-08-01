import { Component, Input, OnInit } from '@angular/core';
import { Client } from './client.model';

@Component({
  selector: 'app-input-binding',
  templateUrl: './input-binding.component.html',
  styleUrls: ['./input-binding.component.css']
})
export class InputBindingComponent implements OnInit {

  @Input() name: string
  @Input('othername') lastname: string
  @Input() age: number

  clients: Client[];
  
  clients2: Client[];

  constructor() {
    this.clients = [
      { id: 1, name: "Bob", age: 20 },
      { id: 2, name: "Ana", age: 40 },
      { id: 3, name: "Jonh", age: 50 },
      { id: 4, name: "maria", age: 60 },

    ]

    this.clients2 = [
      { id: 1, name: "Bob", age: 20 },
      { id: 2, name: "Ana", age: 40 },
      { id: 3, name: "Jonh", age: 50 },
      { id: 4, name: "maria", age: 60 },

    ]
  }

  ngOnInit(): void {
  }

}
