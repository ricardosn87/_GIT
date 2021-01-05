import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  isDraggingOver = false

  @Output() droppedfiles = new EventEmitter<FileList>()

  constructor() { }

  ngOnInit(): void {
  }

  onDragOverEvent(event: any) {
    event.preventDefault()
    //onsole.log(event)
    this.isDraggingOver = true
  }

  onDragLeaveEvent(event: any) {
    event.preventDefault()
    //console.log(event)
    this.isDraggingOver = false
  }

  onDropEvent(event:any){
    event.preventDefault()
    //console.log(event.dataTransfer.files)
    this.droppedfiles.emit(event.dataTransfer.files)
  }
}
