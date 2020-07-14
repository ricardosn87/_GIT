export class IndexDBDTO {
    idIndex: number
    idMarca: number
    nome: string
    descricao: string
    nomeEmpresa: string
    idEmpresa: number

    constructor(idIndex: number,
        idMarca: number,
        nome: string,
        descricao: string,
        nomeEmpresa: string,
        idEmpresa: number) {

            this.idIndex = idIndex
            this.idMarca = idMarca
            this.nome = nome
            this.descricao = descricao
            this.nomeEmpresa = nomeEmpresa
            this.idEmpresa = idEmpresa
    }
}