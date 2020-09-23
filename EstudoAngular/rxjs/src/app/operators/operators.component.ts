import { Component, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, Subscription, Subject, timer } from 'rxjs';
import { map, delay, filter, tap, take, debounceTime, takeWhile, takeUntil } from 'rxjs/operators';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple) ripple: MatRipple

  searchInput: string = ''

  constructor() { }

  ngOnInit(): void {

  }

  mapClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map(i => i * 2),
        map(i => i * 2),
        delay(2000)
      )
      .subscribe(i => console.log(i))

    fromEvent(document, 'click')
      .pipe(
        map((e: MouseEvent) => ({ x: e.screenX, y: e.screenY }))
      )
      .subscribe((pos) => console.log(pos))
  }

  filterClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        filter(i => i % 2 == 1)
      )
      .subscribe(i => console.log(i))

    interval(1000).pipe(
      filter(i => i % 2 == 0),
      map(i => "value: " + i),
      delay(1000)
    ).subscribe(i => console.log(i))
  }

  tapClick() {
    interval(1000).pipe(
      tap(i => console.log('')),
      tap(i => console.log('Before filter', i)),
      filter(i => i % 2 == 0),
      tap(i => console.log('After filter', i)),
      //map(i => "value: " + i),
      tap(i => console.log('After map', i)),
      delay(1000)
    ).subscribe(i => console.log(i))
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for (i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      setTimeout(() => observer.complete(), i * 100)

    });

    const s: Subscription = observable
      .pipe(
        tap(i => console.log(i)),
        take(10)
      )
      .subscribe(v => console.log('output', v))
  }

  debounceTimeClick() {
    fromEvent(document, 'click')
      .pipe(
        tap((e) => console.log("click")),
        debounceTime(2000)
      )
      .subscribe(
        (e: MouseEvent) => {
          console.log("debounce Time: ", e);
          this.launchRipple();
        }
      )
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true, centered: true
    })
    rippleRef.fadeOut();
  }

  searchEntry$: Subject<string> = new Subject<string>();
  searchBy_usingdebounce(event) {
    this.searchEntry$.next(this.searchInput)
  }

  debounceTimeSearchClick() {
    this.searchEntry$
      .pipe(debounceTime(2000))
      .subscribe((v) => console.log(v))
  }

  takeWhileClick() {
    interval(500)
      .pipe(takeWhile((value, index) => (value < 5)))
      .subscribe(v => console.log("TakeWhile: ", v))
  }

  takeUntilClick() {

    let duetime = timer(2000)

    interval(500)
      .pipe(takeUntil(duetime))
      .subscribe(v => console.log("takeUntil: ", v))
  }
}
