import { actionsTypes } from './ActionsTypes'

const defaultState = {
    ListaEmpresaFilter: 1,
    FilterTable: []

}

const reducers = (state = defaultState, action) => {
    switch (action.type) {
        case actionsTypes.LIST_EMPRESA_FILTER:
            return {
                ...state,
                ListaEmpresaFilter: action.ListaEmpresaFilter
            }

        case actionsTypes.SEARCH_FILTER_TABLE:
            return {
                ...state,
                FilterTable: action.FilterTable
            }
    
        default:
            return state;
    }
}

export { reducers }