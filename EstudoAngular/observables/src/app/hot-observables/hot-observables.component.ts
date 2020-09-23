import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';
import { publish,share } from 'rxjs/operators'

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {


  publishProp: Observable<string>;

  constructor() { }

  ngOnInit(): void {
    this.share();
  }

  share(){
    this.publishProp = new Observable(
      (observer: Observer<string>) => {
        let i: number = 0;
        setInterval(() => {
          i++;
          if (i == 20) observer.complete();
          (i % 2 === 0) ? observer.next("botafogo") : observer.next("flamengo");
        }, 1000)
      })

    const multicasted= this.publishProp
      .pipe(share());

    setTimeout(() => {
      multicasted.subscribe((valor) => {
        if (valor === "botafogo") {
          console.log("Botafogo")
        }
        else {
          console.log("flamengo")
        }
      })
    }, 1000);
  }

  publishObservable() {

    this.publishProp = new Observable(
      (observer: Observer<string>) => {
        let i: number = 0;
        setInterval(() => {
          i++;
          if (i == 20) observer.complete();
          (i % 2 === 0) ? observer.next("botafogo") : observer.next("flamengo");
        }, 1000)
      })

    const multicasted: ConnectableObservable<string> = this.publishProp
      .pipe(publish()) as ConnectableObservable<string>;
    multicasted.connect();

    setTimeout(() => {
      multicasted.subscribe((valor) => {
        if (valor === "botafogo") {
          console.log("Botafogo")
        }
        else {
          console.log("flamengo")
        }
      })
    }, 1000);
  }

  hotObservable() {
    this.publishProp = new Observable(
      (observer: Observer<string>) => {
        let i: number = 0;
        setInterval(() => {
          i++;
          if (i == 20) observer.complete();
          (i % 2 === 0) ? observer.next("botafogo") : observer.next("flamengo");
        }, 1000)
      })

    this.inscritos();
  }

  inscritos() {
    const inscrito1 = new Subject<string>();
    this.publishProp.subscribe(inscrito1)

    setTimeout(() => {
      inscrito1.subscribe((valor) => {
        if (valor === "botafogo") {
          console.log("Botafogo")
        }
        else {
          console.log("flamengo")
        }
      })
    }, 1000);
  }
}
