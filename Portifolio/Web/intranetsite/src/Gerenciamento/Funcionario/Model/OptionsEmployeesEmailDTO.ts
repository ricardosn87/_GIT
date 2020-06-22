export class OptionsEmployeesEmailDTO {
    CPF: string
    Email: string


    constructor(CPF: string, Email: string) {

        this.CPF = CPF
        this.Email = Email
    }
}