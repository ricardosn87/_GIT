export class TableDataDTO {
    IdMarca: number
    Nome: string
    Descricao: string
    Ativo: boolean
    IdEmpresa: number

    /**
     *
     */
    constructor(IdMarca: number, Nome: string, Descricao: string, Ativo: boolean, IdEmpresa: number) {
        this.IdMarca = IdMarca;
        this.Nome = Nome;
        this.Descricao = Descricao;
        this.Ativo = Ativo;
        this.IdEmpresa = IdEmpresa;

    }
}