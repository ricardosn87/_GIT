let defaultState = {
    EmpresaGetByCNPJ: '',
    Load: false,
    CadastroEmpresa: false,
    CadastroEmpresaErro: false,
    ListaEmpresa: []
}


export default (state = defaultState, action) => {

    switch (action.type) {
        case "GET_COMPANY_BY_CNPJ":
            return {
                ...state,
                EmpresaGetByCNPJ: action.EmpresaGetByCNPJ
            }

        case "CADASTRO_EMPRESA":
            return {
                ...state,
                CadastroEmpresa: action.CadastroEmpresa
            }

        case "CADASTRO_EMPRESA_ERRO":
            return {
                ...state,
                CadastroEmpresaErro: action.CadastroEmpresaErro
            }

        case "GET_LISTA_EMPRESA_BY_EMAIL":
            return {
                ...state,
                ListaEmpresa: action.ListaEmpresa
            }
        case "TENTAR_NOVAMENTE":
            return {
                ...state,
                CadastroEmpresa: false,
                CadastroEmpresaErro: false
            }
        case "RESET_REDUCER":
            return defaultState;
        case "LOAD":
            return {
                ...state,
                Load: action.Load
            }

        default:
            return state;
    }
}