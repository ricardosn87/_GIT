import * as fromPersonActions from './person.actions'
import { Person } from '../person';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

export interface PeopleState extends EntityState<Person> { }

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
    selectId: (p: Person) => p._id == undefined ? '' : p._id
});

export const initialState: PeopleState = peopleAdapter.getInitialState({})

export function reducer(state = initialState, action: fromPersonActions.PersonActions) {
    switch (action.type) {
        case fromPersonActions.PersonActionTypes.PERSON_ALL:
            return state;

        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            return peopleAdapter.removeOne(action.payload.id, state)

        case fromPersonActions.PersonActionTypes.PERSON_NEW:
            return peopleAdapter.addOne(action.payload.person, state)

        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
            return peopleAdapter.updateOne({ id: action.payload.id, changes: action.payload.changes }, state)

        default:
            return state;
    }
}

/* export const initialState: Person[] = []

export function reducer(state = initialState, action: fromPersonActions.PersonActions) {
    switch (action.type) {
        case fromPersonActions.PersonActionTypes.PERSON_ALL:
            return state;
        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            state = state.filter(x=>x._id !== action.payload.id)
            return state
        case fromPersonActions.PersonActionTypes.PERSON_NEW:
            return state.concat([action.payload.person])
        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
            let p = state.slice()
            let i = p.findIndex(x => x._id == action.payload.person._id)
            console.log("Log Index: " + i)
            if (i > 0) {
                p[i] = action.payload.person
            }
            return p;
        default:
            return state;
    }
} */