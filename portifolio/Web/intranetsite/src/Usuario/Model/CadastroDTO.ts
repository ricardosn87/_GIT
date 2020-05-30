export class CadastroDTO {
    Cpf:string;
    Email:string
    Senha:string
    constructor(Cpf: string,Email:string,Senha:string) {
        this.Cpf = Cpf;
        this.Email= Email
        this.Senha= Senha
      }
}