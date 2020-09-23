import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { Person } from './person.model'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('searchBy') el: ElementRef
  searchInput: string = ''
  people$: Observable<Person[]>;

  private readonly url: string = "http://localhost:9000"

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    //this.firstOptions();
    //this.secondsOptions();
    this.thirdOption();
  }

  filterPeople(seacrhInput: string): Observable<Person[]> {
    if (seacrhInput.length === 0) {
      return of([])
    }
    return this.http.get<Person[]>(this.url + "/" + seacrhInput)
  }

  secondsOptions() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup')
    /*  let fetch$ = keyup$.pipe(
       map((e) => this.filterPeople(this.searchInput)));
 
     fetch$.pipe(mergeAll()).subscribe(r => console.log(r))
 
     this.people$ = fetch$.pipe(mergeAll()) */

    this.people$ = keyup$.pipe(mergeMap((e) => this.filterPeople(this.searchInput)));
  }

  thirdOption() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup'); 
    /*
    this.people$ = keyup$
      .pipe(map( (e) => this.filterPeople(this.searchInput)))
      .pipe(switchAll());
    */
   this.people$ = keyup$
    .pipe(
      debounceTime(700),
      switchMap(()=>this.filterPeople(this.searchInput)))

  }

  firstOptions() {
    fromEvent(this.el.nativeElement, 'keyup')
      .subscribe(e =>
        this.filterPeople(this.searchInput)
          .subscribe(r => console.log(r))
      )
  }

}
