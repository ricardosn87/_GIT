export class EditMarcaDTO {
    IdMarca: number
    Nome: string
    Descricao: string
    IdEmpresa: Number

    constructor(IdMarca: number, Nome: string, Descricao: string, IdEmpresa: Number) {

        this.IdMarca = IdMarca
        this.Nome = Nome
        this.Descricao = Descricao
        this.IdEmpresa = IdEmpresa
    }
}