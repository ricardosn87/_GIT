import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { PrimaryComponent } from './primary/primary.component';
import { SecondComponent } from './second/second.component';
import { AuthGuardChildService } from './guards/auth-guard-child.service';
import { SecondeOneComponent } from './second/seconde-one/seconde-one.component';
import { SecondeTwoComponent } from './second/seconde-two/seconde-two.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimaryComponent,
    SecondComponent,
    SecondeOneComponent,
    SecondeTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuardService,AuthGuardChildService],
  bootstrap: [AppComponent]
})
export class AppModule { }
