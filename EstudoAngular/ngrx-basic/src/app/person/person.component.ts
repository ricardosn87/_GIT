import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';

import { Person } from '../person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input() people: Person
  @Output() delete:EventEmitter<Person> = new EventEmitter<Person>();
  @Output() update:EventEmitter<Person> = new EventEmitter<Person>()

  constructor() {
    this.people = new Person('', 0, '', '', '')
  }

  ngOnInit(): void {
  }

}
