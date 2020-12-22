import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(private fb: FormBuilder) { }

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

  onSubmit(){
    
  }

}
