let defaultState = {
    GetMarcaByNomeState: null,
    GetDescriptionByNomeState: null,
    SaveMarcaState: null,
    ListaMarcas: [],
    ValorMarcaFiltered: null,
    ValorDescricaoFiltered: null,
    ValorEmpresaFiltered: 0,
    MarcaEditClose: false,
    MarcaEditDTO: [],
    EditMarcaState: null,
    TableListEffectState: true,
    PositionPaginationMarca: 1
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case "GET_MARCA_NOME":
            return {
                ...state,
                GetMarcaByNomeState: action.GetMarcaByNomeState
            }
        case "GET_MARCA_DESCRICAO":
            return {
                ...state,
                GetDescriptionByNomeState: action.GetDescriptionByNomeState
            }
        case "SAVE_MARCA":
            return {
                ...state,
                SaveMarcaState: action.SaveMarcaState
            }
        case "GET_LIST_MARCA":
            return {
                ...state,
                ListaMarcas: action.ListaMarcas
            }
        case "GET_LIST_NOME_FILTERED":
            return {
                ...state,
                ValorMarcaFiltered: action.ValorMarcaFiltered
            }
        case "GET_LIST_DESCRICAO_FILTERED":
            return {
                ...state,
                ValorDescricaoFiltered: action.ValorDescricaoFiltered
            }
        case "GET_LIST_EMPRESA_FILTERED":
            return {
                ...state,
                ValorEmpresaFiltered: action.ValorEmpresaFiltered
            }

        case "SET_MARCA_EDIT_CLOSE":
            return {
                ...state,
                MarcaEditClose: action.MarcaEditClose
            }
        case "SEND_EDIT_MARCA_DTO":
            return {
                ...state,
                MarcaEditDTO: action.MarcaEditDTO
            }

        case "EDIT_MARCA":
            return {
                ...state,
                EditMarcaState: action.EditMarcaState
            }
        case 'TABLE_LIST_EFFECT':
            return {
                ...state,
                TableListEffectState: action.TableListEffectState
            }

        case 'SET_POSITION_PAGINATION_MARCA':
            return {
                ...state,
                PositionPaginationMarca: action.PositionPaginationMarca
            }
        default:
            return state;
    }
}