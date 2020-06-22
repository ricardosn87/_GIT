export class MudarSenhaDTO {
    Cpf: string;
    Key: string
    Senha: string
    
    constructor(Cpf: string, Key: string, Senha: string) {
        this.Cpf = Cpf;
        this.Key = Key
        this.Senha = Senha
    }
}