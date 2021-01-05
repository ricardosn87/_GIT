import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { FileEntry } from '../models/fileentry.model';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  files: FileEntry[] = [];

  constructor(private filesService: FilesService) { }

  ngOnInit(): void {
  }

  onDropFiles(files: FileList) {
    this.files.splice(0, this.files.length)
    for (let i = 0; i < files.length; i++) {
      //this.filesService.uploadFile(files.item(i))
      this.files.push({
        file: files.item(i), percentage: null, bytesuploaded: null, canceled: null,
        error: null, finished: null, paused: null, state: null, task: null, uploading: null
      })
    }
  }

  removeFileList(i: number) {
    this.files.splice(i, 1)
  }

  uploadAll() {
    for (let i = 0; i < this.files.length; i++)
      this.filesService.upload(this.files[i])
  }

  pausar(f: FileEntry) {
    this.filesService.pausar(f);
  }
  rodando(f: FileEntry) {
    this.filesService.rodando(f)
  }
}
