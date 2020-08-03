import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-child',
  templateUrl: './check-child.component.html',
  styleUrls: ['./check-child.component.css']
})
export class CheckChildComponent implements OnInit {

  constructor() { 
    console.log("      CheckChildComponent constructor ")
  }

  ngOnInit(): void {
    console.log("      CheckChildComponent ngOnInit")
  }
  ngOnChanges() {
    console.log("      CheckChildComponent ngOnChanges")
  }
  ngDoCheck() {
    console.log("      CheckChildComponent ngDoCheck")
  }
  ngAfterContentInit() {
    console.log("      CheckChildComponent ngAfterContentInit")
  }
  ngAfterContentChecked() {
    console.log("      CheckChildComponent ngAfterContentChecked")
  }
  ngAfterViewInit() {
    console.log("      CheckChildComponent ngAfterViewInit")
  }
  ngAfterViewChecked() {
    console.log("      CheckChildComponent ngAfterViewChecked")
  }
  ngOnDestroy(){
    console.log("      CheckChildComponent ngOnDestroy")
  }

}
