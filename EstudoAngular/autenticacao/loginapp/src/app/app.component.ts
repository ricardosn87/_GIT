import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   authenticated$:Observable<boolean>;
   user$:Observable<User>;

   constructor(private authService:AuthService,private router:Router){
     this.authenticated$ = this.authService.isAuthenticated();
     this.user$ = this.authService.getUser()
   }

   logout(){
     this.authService.logout();
     this.router.navigateByUrl('/auth/login')
   }
}
