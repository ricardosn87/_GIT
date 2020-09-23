import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myrect') myrect: ElementRef

  top: number = 40
  left: number = 40

  saiu: boolean = false

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    let mousedown = fromEvent(this.myrect.nativeElement, 'mousedown')
    let mousemove = fromEvent(document, 'mousemove')
    let mouseup = fromEvent(document, 'mouseup')


    console.log(mouseup)
    mousedown.subscribe((ed: MouseEvent) => {
        let x = ed.screenX;
        let y = ed.screenY;

        mousemove
          .pipe(
            takeUntil(mouseup)
          )
          .subscribe((em: MouseEvent) => {
            this.top = em.pageY
            this.left = em.pageX

          })
      })
  }
}
