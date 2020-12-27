import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  formRegister = this.fb.group({
    'firstname': ['', [Validators.required]],
    'lastname': ['', [Validators.required]],
    'address': ['', [Validators.required]],
    'city': ['', [Validators.required]],
    'state': ['', [Validators.required]],
    'phone': ['', [Validators.required]],
    'mobilephone': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]]
  }, { validator: this.machingPasswords })

  machingPasswords(group: FormGroup) {
    if (group) {
      const p1 = group.controls['password1'].value
      const p2 = group.controls['password2'].value
      if (p1 == p2) {
        return null;
      }
    }
    return { matching: false }
  }

  states = ['RJ', 'MG', 'SP', 'RS']

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formRegister.value)
    let u: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1
    }

    this.authService.register(u)
      .subscribe(
        (u) => {
          this.snackBar.open(
            'Sucesso no Cadastro',
            'OK', { duration: 2000 }
          );
          this.router.navigateByUrl('/auth/login')
        },
        (err) => {
          this.snackBar.open(
            err.error.message,
            'Erro', { duration: 2000 }
          )
        }
      )
  }
}
