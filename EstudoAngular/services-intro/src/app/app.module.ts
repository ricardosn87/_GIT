import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material.module'
import { Module1Module } from './module1/module1.module';
import { Module2Module } from './module2/module2.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { Service2 } from './service2.service';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    Module1Module,
    Module2Module,
    //MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
