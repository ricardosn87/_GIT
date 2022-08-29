import { MaterialExampleModule } from './material.modulo';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskModule, IConfig } from 'ngx-mask'
//import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    PerfilCadastroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    //ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
