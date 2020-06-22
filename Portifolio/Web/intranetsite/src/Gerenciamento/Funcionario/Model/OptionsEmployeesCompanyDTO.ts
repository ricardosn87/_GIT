export class OptionsEmployeesCompanyDTO {
    CNPJ: string
    RazaoSocial: string


    constructor(CNPJ: string, RazaoSocial: string) {

        this.CNPJ = CNPJ
        this.RazaoSocial = RazaoSocial
    }
}