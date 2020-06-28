let defaultState = {
    GetMarcaByNomeState: null,
    GetDescriptionByNomeState: null,
    SaveMarcaState:null
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
        default:
            return state;
    }
}