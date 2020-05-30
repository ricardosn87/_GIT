export class EmpresaTableListDTO {
    Position: number
    CNPJ: string;
    RazaoSocial: string;
    NomeFantasia: string;

    constructor(Position: number, CNPJ: string, RazaoSocial: string, NomeFantasia: string) {
        this.CNPJ = CNPJ;
        this.RazaoSocial = RazaoSocial
        this.NomeFantasia = NomeFantasia
        this.Position = Position
    }
}