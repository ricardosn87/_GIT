export class TableListDataEmployeeDTO {
    Position: number
    RazaoSocial: string
    CPF: string;
    Nome: string;
    Email: string;
    DataCadastro: Date
    CNPJ:string

    constructor(Position: number, RazaoSocial: string, CPF: string, Nome: string, Email: string, DataCadastro: Date,CNPJ:string) {
        this.Position = Position;
        this.RazaoSocial = RazaoSocial
        this.CPF = CPF
        this.Nome = Nome
        this.Email = Email
        this.DataCadastro = DataCadastro
        this.CNPJ = CNPJ
    }
}