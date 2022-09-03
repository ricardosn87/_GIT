
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilCadastroComponent,
    LoginComponent

  ],
  imports: [
    AppModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
