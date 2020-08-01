import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputBindingComponent } from './input-binding/input-binding.component';
import { ClientComponent } from './input-binding/client/client.component';
import { EventComponent } from './event/event.component';
import { ChildItemComponent } from './event/child-item/child-item.component';

import {MatCardModule} from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    InputBindingComponent,
    ClientComponent,
    EventComponent,
    ChildItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
