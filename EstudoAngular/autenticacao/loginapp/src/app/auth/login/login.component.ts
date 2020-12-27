import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {




  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit(): void {
  }

  onSubmit(): void {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (u) => {
        this.snackBar.open(
          'Sucesso no Login',
          'OK', { duration: 5000 }
        );
        this.router.navigateByUrl('/')
      },
      (err) => {
        this.snackBar.open(
          err.error.message,
          'Erro', { duration: 5000 }
        )
      }
    )
  }
}
