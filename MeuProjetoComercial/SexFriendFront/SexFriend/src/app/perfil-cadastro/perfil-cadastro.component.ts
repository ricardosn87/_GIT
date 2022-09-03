import { Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from './../util/notification.service';
import { Component, OnInit } from '@angular/core';
import { Perfil } from '../Models/perfil.model';
import { CadastroServiceService } from './cadastro-service.service';

@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.css']
})

export class PerfilCadastroComponent implements OnInit {

  // cadastrado: boolean = false
  // textoDeRediricionamento: string = 'Você será redirecionado para página de Login em '
  // countDownPage: number = 5
  // formLoaded: boolean = false
  // cpf: string

  // estados: string[]
  // rangerYears: string[]

  // selectedYears: string;
  // selectedUF: string;

  // checkoutForm = this.formBuilder.group({
  //   cpf: ['', {
  //     validators: [
  //       Validators.required
  //     ]
  //   }],
  //   nome: ['', {
  //     validators: [
  //       Validators.required

  //     ]
  //   }],
  //   dataNascimento: ['', {
  //     validators: [
  //       Validators.required
  //     ]
  //   }],
  //   email: ['', {
  //     validators: [
  //       Validators.required,
  //       Validators.email
  //     ]
  //   }],
  //   senha: ['', {
  //     validators: [
  //       Validators.required
  //     ]
  //   }],
  //   estado: ['', {
  //     validators: [
  //       Validators.required
  //     ]
  //   }],
  //   cidade: ['', {
  //     validators: [
  //       Validators.required
  //     ]
  //   }],
  //   bairro: ['', {
  //     validators: [
  //       Validators.required
  //     ]
  //   }],
  // });

  // constructor(private cadastroServiceService: CadastroServiceService,
  //   private formBuilder: FormBuilder,
  //   private notifyService: NotificationService
  // ) { }


   ngOnInit(): void {
  //   this.estados = this.cadastroServiceService.getStatesFromBrazil()
  //   this.rangerYears = this.cadastroServiceService.getRangerDate()
  //   this.cadastrado = false
  //   this.formLoaded = true
   }

  // cpfChange(event:any) {

  //   this.checkoutForm.valueChanges.subscribe(x => {
  //     console.log('Form Value Changes: ' + JSON.stringify(x));
  //     console.log('First Name Value Chang: ' + x.cpf);
  //   });

  //   this.checkoutForm.statusChanges.subscribe(x => {
  //     console.log('Form Status: ' + x);
  //   });

  //   this.checkoutForm.controls['cpf'].statusChanges.subscribe(x => {
  //    console.log('cpf Status: ' + x);
  //   });
  // }

  // savePerfil(): void {
  //   var p = new Perfil()
  //   p.Cpf = this.checkoutForm.get('cpf')?.value
  //   p.Nome = this.checkoutForm.get('nome')?.value
  //   p.DataNascimento = this.checkoutForm.get('dataNascimento')?.value + '-01-01'
  //   p.Email = this.checkoutForm.get('email')?.value
  //   p.Senha = this.checkoutForm.get('senha')?.value
  //   p.Estado = this.checkoutForm.get('estado')?.value
  //   p.Cidade = this.checkoutForm.get('cidade')?.value
  //   p.Bairro = this.checkoutForm.get('bairro')?.value

  //   this.cadastroServiceService.save(p)
  //     .subscribe(
  //       () => {
  //         this.notifyService.showSuccess("Sucesso!", "Cadastro realizado com sucesso!")
  //         this.cadastrado = true
  //         this.startCount()

  //       },
  //       (err) => console.error(err),
  //       () => console.log("observable complete")
  //     );
  // }

  // redirectToLoginPage() {
  //   this.countDownPage = this.countDownPage - 1;
  //   if (this.countDownPage == 0) {
  //     //window.location.href = "http://www.w3schools.com";
  //   }
  // }

  // startCount() {
  //   setInterval(() => this.redirectToLoginPage(), 1000);
  // }

  // get f() {
  //   return this.checkoutForm.controls;
  // }
}
