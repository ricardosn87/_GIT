export class EmpresaDTO {
    CNPJ: string;
    RazaoSocial: string;
    NomeFantasia: string;

    

    constructor(CNPJ: string, RazaoSocial: string, NomeFantasia: string) {
        this.CNPJ = CNPJ;
        this.RazaoSocial = RazaoSocial
        this.NomeFantasia = NomeFantasia
    }   
}