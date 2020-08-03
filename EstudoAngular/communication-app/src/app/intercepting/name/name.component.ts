import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  private _name = ""

  @Input()
  set name(name: string) { 
    this._name = "Your name: " + (name || '<name empity>');
  }

  get name(): string {   
    return this._name ;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
