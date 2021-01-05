import { ActionReducerMap, createSelector } from '@ngrx/store'
import { Person } from '../person'
import { PersonActions } from './person.actions'

import * as fromPersonReducer from './person.reducer'

/* export interface AppState {
    people: Person[]
} */

export interface AppState {
    people: fromPersonReducer.PeopleState
}

export const appReducers: ActionReducerMap<AppState, PersonActions> = {
    people: fromPersonReducer.reducer
}

/* export const selectPeople = (state: AppState) => state.people
export const selectedPeopleCount = createSelector(
    selectPeople,
    (people) => people.length
)

export const selectedPeopleCount2 = createSelector(
    selectedPeopleCount,
    selectPeople,
    (n, people) => n + 1
) */