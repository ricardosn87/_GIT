import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProductFormComponent } from './product-form/product-form.component';
import { DepartamentFormComponent } from './departament-form/departament-form.component';
import { ProductsTableComponent } from './products-table/products-table.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    DepartamentFormComponent,
    ProductsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
