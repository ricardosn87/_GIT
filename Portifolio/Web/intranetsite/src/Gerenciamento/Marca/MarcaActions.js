import axios from 'axios'
import { IndexDBDTO } from './Model/IndexDBDTO';

const URL_Marca = 'api/marca/'

export async function GetMarcaByNome(dispatch, nomeMarca) {

    try {
        const response = await axios.get(URL_Marca + 'GetMarcaByNome/' + nomeMarca)
        dispatch({
            type: 'GET_MARCA_NOME',
            GetMarcaByNomeState: response.status
        })
    } catch (error) {

        switch (error.response.status) {
            case 404:
                dispatch({
                    type: 'GET_MARCA_NOME',
                    GetMarcaByNomeState: error.response.status
                })
                break;
            default:
                dispatch({
                    type: 'GET_MARCA_NOME',
                    GetMarcaByNomeState: error.response.status
                })
                break;
        }
    }
}

export async function SaveMarca(dispatch, SaveMarcaDTO) {
    try {

        const dados = {
            Nome: SaveMarcaDTO.Nome,
            Descricao: SaveMarcaDTO.Descricao,
            IdEmpresa: SaveMarcaDTO.IdEmpresa
        }

        await axios.post(URL_Marca + 'savemarca', dados)
        dispatch({
            type: 'SAVE_MARCA',
            SaveMarcaState: 200
        })

    } catch (error) {
        dispatch({
            type: 'SAVE_MARCA',
            SaveMarcaState: error.response.status
        })
    }
}

export async function GetMarcaByEmailUser(dispatch, email) {
    try {

        const response = await axios.get(URL_Marca + 'GetMarcaByEmailUser/' + email)

        dispatch({ type: 'GET_LIST_MARCA', ListaMarcas: MontarDados(response.data) })

    } catch (error) {

    }
}

const MontarDados = (dados) => {

    var indexDBDTOArray = []

    if (dados.length > 0 && dados !== undefined) {
        var lote = 1
        var loteMaximo = 3
        var paginacao = 1
        dados.map((value, index) => {

            var indexDBDTO = new IndexDBDTO(paginacao,
                value.idMarca,
                value.nome,
                value.descricao,
                value.nomeEmpresa,
                value.idEmpresa)

            indexDBDTOArray.push(indexDBDTO)
            if (lote === loteMaximo) {
                lote = 1
                paginacao = paginacao + 1
            }
            else {
                lote = lote + 1
            }
        })

    }

    return indexDBDTOArray
}

export async function EditMarca(dispatch, SaveMarcaDTO) {
    try {

        const dados = {
            IdMarca: SaveMarcaDTO.IdMarca,
            Nome: SaveMarcaDTO.Nome,
            Descricao: SaveMarcaDTO.Descricao,
            IdEmpresa: SaveMarcaDTO.IdEmpresa
        }

        await axios.put(URL_Marca + 'updatemarca', dados)
        dispatch({
            type: 'EDIT_MARCA',
            EditMarcaState: 200
        })

    } catch (error) {
        dispatch({
            type: 'EDIT_MARCA',
            EditMarcaState: error.response.status
        })
    }
}