export class SaveFuncionarioDTO {
    Cpf: string;
    Senha: string;
    Email: string;
    Nome: string;
    IdEmpresa: number



    constructor(Cpf: string, Senha: string, Email: string, Nome: string, IdEmpresa: number) {
        this.Cpf = Cpf;
        this.Senha = Senha
        this.Email = Email
        this.Nome = Nome
        this.IdEmpresa = IdEmpresa
    }
}