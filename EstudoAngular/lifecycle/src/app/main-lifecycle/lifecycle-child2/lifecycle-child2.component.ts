import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifecycle-child2',
  templateUrl: './lifecycle-child2.component.html',
  styleUrls: ['./lifecycle-child2.component.css']
})
export class LifecycleChild2Component implements OnInit {

  constructor() { 

    console.log("inicio ngOnInit LifecycleChild2Component");
    this.sleep(5000);
    console.log("fim ngOnInit LifecycleChild2Component");
    
  }
  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  ngOnInit(): void {
    console.log("ngOnInit LifecycleChild2Component");
  }

}
