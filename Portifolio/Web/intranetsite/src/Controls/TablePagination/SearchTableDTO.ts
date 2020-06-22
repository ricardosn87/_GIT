export class SearchTableDTO {
    ValorCNPJ: string
    ValorRazaoSocial: string
    ValorNomeFantasia: string
    constructor(ValorCNPJ: string, ValorRazaoSocial: string, ValorNomeFantasia: string) {
        this.ValorCNPJ = ValorCNPJ
        this.ValorRazaoSocial = ValorRazaoSocial
        this.ValorNomeFantasia = ValorNomeFantasia
    }
}