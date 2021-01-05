import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Person } from './person';
import { AppState } from './store';
import { PersonNew, PersonAll, PersonUpdate, PersonDelete } from './store/person.actions';
import * as faker from 'faker'

import * as fromPersonSelectors from './store/persons.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  people$: Person[] = []
  personNew: Person

  constructor(private store: Store<AppState>) {
    this.personNew = new Person('', 0, '', '', '')

  }

  ngOnInit() {
    this.store.dispatch(new PersonAll())
    this.store.select(fromPersonSelectors.selectAll).subscribe(
      (s) => this.people$ = s
    )
    /* this.store.pipe(select('people')).subscribe(s => {
      this.people$ = s
    }) */

    this.store.select(fromPersonSelectors.selectTotal).subscribe((s) => console.log("Total no State: " + s))
  }

  addNew() {
    let person: Person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
      _id: new Date().getMilliseconds().toString()
    }

    this.store.dispatch(new PersonNew({ person }))
    //this.store.dispatch(new PersonNew({ id: person._id == undefined ? '' : person._id, changes: person }))
  }

  update(p: Person) {
    this.personNew = new Person('', 0, '', '', '')
    this.personNew.name = faker.name.findName(),
      this.personNew.address = faker.address.streetAddress(),
      this.personNew.city = faker.address.city(),
      this.personNew.country = faker.address.country(),
      this.personNew.age = Math.round(Math.random() * 100),
      this.personNew._id = p._id

    //this.store.dispatch(new PersonUpdate({ person: { ...p, ...this.personNew } }))
    this.store.dispatch(new PersonUpdate({ id: this.personNew._id == undefined ? '' : this.personNew._id, changes: this.personNew }))

  }
  delete(p: Person) {
    this.store.dispatch(new PersonDelete({ id: p._id == undefined ? '' : p._id }))
  }
}
