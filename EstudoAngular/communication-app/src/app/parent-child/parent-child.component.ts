import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.css']
})
export class ParentChildComponent implements OnInit {

  // @ViewChild("stopwatch2")
  @ViewChild(TimerComponent)
  private mytimer: TimerComponent

  @ViewChild('myP')
  private myP: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  start() {
    this.mytimer.start();
  }
  stop() {
    this.mytimer.stop()
  }
  clear() {
    this.mytimer.clear()
  }

  ngAfterViewInit(){
      console.log(this.myP)
  }

}
