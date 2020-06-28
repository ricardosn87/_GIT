export class SaveMarcaDTO {    
    Nome: string
    Descricao: string
    IdEmpresa: Number

    constructor( Nome: string, Descricao: string, IdEmpresa: Number) {
       
        this.Nome = Nome
        this.Descricao = Descricao
        this.IdEmpresa = IdEmpresa
    }
}