export class EmployeeUpdateDTO {
    CPF: string
    Nome: string
    Email: string
    IdEmpresa: Number


    constructor(CPF: string, Nome: string, Email: string, IdEmpresa: Number) {

        this.CPF = CPF
        this.Nome = Nome
        this.Email = Email
        this.IdEmpresa = IdEmpresa
    }
}