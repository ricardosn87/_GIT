import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent implements OnInit {

  buttonName = "My button"
  i = 0
  spinnerMode = "determinate"
  btnDisabled = true
  selectDisabled = false
  selectedOption = 1
  inputName = "ricardo"

  constructor() { }

  ngOnInit(): void {
  }
  save(){
    console.log("Click")
  }

  inc(){
    this.i++;
    this.buttonName = "It was clicked " + this.i + " times"
  }

  disabled(){
      this.btnDisabled = false
      this.spinnerMode = "indeterminate"

      setTimeout(() => {
        this.btnDisabled = true
        this.spinnerMode = "determinate"
      },3000)
  }

  cbChange(event){
     console.log(event.checked)

     this.selectDisabled = event.checked;
  }

  selectionChange(event){
    console.log(event)
    this.selectedOption = event.value
  }

 /*  inputEvent(event){
    console.log(event.target.value)
  } */

}
