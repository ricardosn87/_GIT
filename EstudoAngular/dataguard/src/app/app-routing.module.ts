import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardChildService } from './guards/auth-guard-child.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { PrimaryComponent } from './primary/primary.component';
import { SecondComponent } from './second/second.component';
import { SecondeOneComponent } from './second/seconde-one/seconde-one.component';
import { SecondeTwoComponent } from './second/seconde-two/seconde-two.component';

const routes: Routes = [
  { path: 'app-primary', component: PrimaryComponent, canActivate: [AuthGuardService] },
  { path: 'app-second', component: SecondComponent, canActivate: [AuthGuardService] },
  {
    path: 'app-second', canActivateChild: [AuthGuardChildService],
    children: [
      { path: 'app-seconde-one', component: SecondeOneComponent },
      { path: 'app-seconde-two', component: SecondeTwoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
