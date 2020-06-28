import axios from 'axios'

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