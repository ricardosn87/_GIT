import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Perfil } from '../Models/perfil.model';
import { CadastroServiceService } from './cadastro-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.css']
})
export class PerfilCadastroComponent implements OnInit {

  estados: string[]
  rangerYears: string[]

  selectedYears: string;
  selectedUF: string;

  checkoutForm = this.formBuilder.group({
    cpf: ['', {
      validators: [
        Validators.required
      ]
    }],
    nome: ['', {
      validators: [
        Validators.required
      ]
    }],
    dataNascimento: ['', {
      validators: [
        Validators.required
      ]
    }],
    email: ['', {
      validators: [
        Validators.required,
        Validators.email
      ]
    }],
    senha: ['', {
      validators: [
        Validators.required
      ]
    }],
    estado: ['', {
      validators: [
        Validators.required
      ]
    }],
    cidade: ['', {
      validators: [
        Validators.required
      ]
    }],
    bairro: ['', {
      validators: [
        Validators.required
      ]
    }],
  });

  constructor(private cadastroServiceService: CadastroServiceService,
    private formBuilder: FormBuilder
    ) { }


  ngOnInit(): void {
    this.estados = this.cadastroServiceService.getStatesFromBrazil()
    this.rangerYears = this.cadastroServiceService.getRangerDate()
  }

  savePerfil(): void {
    var p = new Perfil()
    p.Cpf = this.checkoutForm.get('cpf')?.value
    p.Nome = this.checkoutForm.get('nome')?.value
    p.DataNascimento = this.checkoutForm.get('dataNascimento')?.value + '-01-01'
    p.Email = this.checkoutForm.get('email')?.value
    p.Senha = this.checkoutForm.get('senha')?.value
    p.Estado = this.checkoutForm.get('estado')?.value
    p.Cidade = this.checkoutForm.get('cidade')?.value
    p.Bairro = this.checkoutForm.get('bairro')?.value

    this.cadastroServiceService.save(p)
      .pipe(
        tap(
          {
            //next: (data) => this.toastr.success('Sucesso.', 'Seu cadastro foi realizado com sucesso! Você será redirecionado para a página de Login!'),
            next: (data) => console.log(data),
            error: (error) => console.log(error)
          }
        ))
  }
}
