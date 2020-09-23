import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, never, Observer } from 'rxjs';


@Component({
  selector: 'app-hot-obervables-intro',
  templateUrl: './hot-obervables-intro.component.html',
  styleUrls: ['./hot-obervables-intro.component.css']
})
export class HotObervablesIntroComponent implements OnInit {

  @ViewChild('myButton') button: ElementRef;

  n1: number = 0
  n2: number = 0

  s1: string = ''
  s2: string = ''


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click'
    );

    myBtnClickObservable.subscribe((event) => console.log('button clicked 1'))
    myBtnClickObservable.subscribe((event) => console.log('button clicked 2'))

    class Producer {
      private myListeners = []
      private n = 0
      private id;

      addListener(l) {
        this.myListeners.push(l)
      }

      start() {
        this.id = setInterval(() => {
          this.n++;
          console.log("From Producer: " + this.n)
          for (let l of this.myListeners)
            l(this.n)
        }, 4000)
      }

      stop() {
        clearInterval(this.id)
      }
    }

    let producer: Producer = new Producer();
    producer.start();

   /*  setTimeout(() => {

      producer.addListener((n) => console.log("from listener 1", n))
      producer.addListener((n) => console.log("from listener 2", n))
    }, 4000) */

    const myHotObservable = new Observable(
      (observer:Observer<Number>)=>{
        producer.addListener((n) => observer.next(n))
      }
    )

    myHotObservable.subscribe((n) => console.log("from subscribe 1 ",n));
    myHotObservable.subscribe((n) => console.log("from subscribe 2 ",n));
  }

}
