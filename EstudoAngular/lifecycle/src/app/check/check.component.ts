import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  @Input() teste: string

  name: string = ""
  age: number = 0;
  constructor() {
    console.log("constructor")
  }

  ngOnInit(): void {
    console.log("ngOnInit")
  }
  ngOnChanges() {
    console.log("ngOnChanges")
  }
  ngDoCheck() {
    console.log("ngDoCheck")
  }
  ngAfterContentInit() {
    console.log("ngAfterContentInit")
  }
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked")
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit")
  }
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked")
  }
  ngOnDestroy() {
    console.log("ngOnDestroy")
  }

}
