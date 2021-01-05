import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {  AngularFireStorageModule } from '@angular/fire/storage';
import {  AngularFirestoreModule } from '@angular/fire/firestore';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { DropzoneComponent } from './upload-files/dropzone/dropzone.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent,
    MyFilesComponent,
    DropzoneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
