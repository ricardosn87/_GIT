import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ProdcutsComponent } from './prodcuts/prodcuts.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ProdcutsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MaterialModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
