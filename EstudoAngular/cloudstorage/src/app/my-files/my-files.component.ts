import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesService } from '../files.service';
import { MyFile } from '../models/myfile.model';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {

  files: MyFile[] = [];
  //files: Observable<MyFile[]>

  constructor(private fileService: FilesService) {

  }

  ngOnInit(): void {
    //this.files = this.fileService.getFiles()
    this.fileService.getFiles()
      .subscribe(
        (f) => this.files = f
      );
  }
}
