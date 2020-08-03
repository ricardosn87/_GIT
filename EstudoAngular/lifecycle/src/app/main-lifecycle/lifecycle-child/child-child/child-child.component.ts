import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-child',
  templateUrl: './child-child.component.html',
  styleUrls: ['./child-child.component.css']
})
export class ChildChildComponent implements OnInit {

  @Input() name: string

  constructor() { }

  ngOnInit(): void {
    console.log("     Child Child (ngOnInit) - " + this.name)
  }

  ngOnChanges() {
    console.log("     Child Child (ngOnChanges) - " + this.name)
  }
  ngAfterContentInit() {
    console.log("     Child Child (ngAfterContentInit) - " + this.name)
  }

}
