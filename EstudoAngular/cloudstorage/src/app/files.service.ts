import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { FileEntry } from './models/fileentry.model';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MyFile } from './models/myfile.model';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filesCollection: AngularFirestoreCollection<MyFile>;

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore) {
    this.filesCollection = afs.collection('myfiles', ref => ref.orderBy('date', 'desc'))
  }

  uploadFile(f: File | null) {
    let path = `myfiles/${f?.name}`
    let task = this.storage.upload(path, f)
    task.snapshotChanges()
      .subscribe(
        (s) => (console.log(s))
      )
  }

  pausar(f: FileEntry) {
    f?.task?.pause()
    f.state = "paused";
    this.fillAtttributes(f)
  }

  rodando(f: FileEntry) {
    f?.task?.resume()
    f.state = "running";
    this.fillAtttributes(f)
  }

  upload(f: FileEntry) {

    let newfilename = `${(new Date()).getTime()}_${f.file?.name}`
    let path = `myfiles/${newfilename}`
    f.task = this.storage.upload(path, f.file)

    let url: string;
    url = ''

    f.state = f.task.task.snapshot.state;
    this.fillAtttributes(f)

    f.task.task.then(x => {

      f.state = x.state
      this.fillAtttributes(f)

      x.task.snapshot.ref.root.child(path).getDownloadURL().then(x => {
        url = x
        if (url != '') {
          this.saveStore(f, url)
        }
      })
    })
      .catch(() => {
        f.state = "canceled";
        this.fillAtttributes(f)
      })
  }

  saveStore(f: FileEntry, path: string) {
   
    this.filesCollection.add({
      filename: f.file?.name == undefined ? '' : f.file?.name,
      path: path,
      date: (new Date()).getTime(),
      size: f.file?.size == undefined ? 0 : f.file?.size
    })
  }

  fillAtttributes(f: FileEntry) {
    f?.task?.percentageChanges().subscribe((s) => f.percentage = s?.toExponential() == undefined ? null : s?.toExponential())
    f.uploading = f.state == "running"
    f.finished = f.state == "success"
    f.paused = f.state == "paused"
    f.error = f.state == "error"
    f.canceled = f.state == "canceled"
    f.task?.snapshotChanges().subscribe((s) => f.bytesuploaded = s?.bytesTransferred == undefined ? null : s?.bytesTransferred)

  }

  getFiles(): Observable<MyFile[]> {
    return this.filesCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {

            const file: MyFile = a.payload.doc.data()
            const id = a.payload.doc.id
            return { id, ...file }
          })
        })
      )
  }
}
