import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  subscription1: Subscription
  subscription2: Subscription
  n1: number = 0
  n2: number = 0

  s1: string = ''
  s2: string = ''

  constructor() { }

  ngOnInit(): void {
    this.s1 = "Iniciando..."
    this.s2 = "Iniciando..."


    const myIntervalObservable = new Observable(
      (observe: Observer<any>) => {

        let i: number = 0

        let id = setInterval(() => {
          i++;

          if (i == 10) {
            observe.complete()
          }
          else if (i % 2 == 0) {
            observe.next(i)
          }
        }, 1000);

        return () => {
          clearInterval(id);
        }

      })

    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => { console.log("next: " + _n), this.n1 = _n },
      (error) => { this.s1 = 'Erro: ' + error },
      () => { this.s1 = "Completed " }
    )

    setInterval(() => {
      this.subscription2 = myIntervalObservable.subscribe(
        (_n) => { console.log("next 2: " + _n), this.n2 = _n },
        (error) => { this.s2 = 'Erro: ' + error },
        () => { this.s2 = "Completed " }
      )
    }, 3000)


    setTimeout(() => {
      this.subscription1.unsubscribe()
      this.subscription2.unsubscribe()
    }, 3000);
  }

}
