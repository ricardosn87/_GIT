export class ChangeCompanyDTO {
    Cnpj: string;
    RazaoSocial: string;
    NomeFantasia: string;
    constructor(Cnpj: string,RazaoSocial: string,NomeFantasia: string) {
        this.Cnpj = Cnpj
        this.RazaoSocial = RazaoSocial
        this.NomeFantasia = NomeFantasia
    }
}