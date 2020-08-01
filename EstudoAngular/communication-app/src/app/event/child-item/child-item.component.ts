import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css']
})
export class ChildItemComponent implements OnInit {

  @Input() title: string
  @Output() inc = new EventEmitter<number>();
 /* @Output() plusOne = new EventEmitter<any>();
   @Output() plusTwo = new EventEmitter<any>();
  @Output() minusOne = new EventEmitter<any>();
  @Output() minusTwo = new EventEmitter<any>(); */

  constructor() { }

  ngOnInit(): void {
  }

  onClick(n) {
    this.inc.emit(n)
    // this.plusOne.emit()
  }

  /* plusTwoClick() {
    this.inc.emit(2)
    // this.plusTwo.emit()
  }
  minusOneClick() {
    this.inc.emit(-1)
    // this.minusOne.emit()
  }
  minusTwoClick() {
    this.inc.emit(-2)
    // this.minusTwo.emit()
  } */

}
