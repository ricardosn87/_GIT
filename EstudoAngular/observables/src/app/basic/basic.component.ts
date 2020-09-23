import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

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
    const myFirstObservable = new Observable(
      (observer: Observer<Number>) => {
        observer.next(1)
        observer.next(2)
        observer.next(3)
        observer.next(4)
        observer.next(5)
        observer.error("Erro no 6")
        observer.complete()
      }
    )

    myFirstObservable.subscribe(
      (n: number) => console.log(n),
      (error) => console.error(error),
      () => console.log('completed')
    )

    /*  const timerCount = interval(500)
     timerCount.subscribe(
       (n) => console.log(n)
     )
 
     console.log("after interval.") */

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
      (_n) => { console.log("next: " + _n) , this.n1 = _n },
      (error) => { this.s1 = 'Erro: ' + error },
      () => { this.s1 = "Completed " }
    )

    this.subscription2 = myIntervalObservable.subscribe(
      (_n) => { console.log("next 2: " + _n) , this.n2 = _n },
      (error) => { this.s2 = 'Erro: ' + error },
      () => { this.s2 = "Completed " }
    )

    setTimeout(() => {
      this.subscription1.unsubscribe()
      this.subscription2.unsubscribe()
    }, 3000);
  }
}
