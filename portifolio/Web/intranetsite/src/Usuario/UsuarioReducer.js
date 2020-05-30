let defaultState = {
    UsuarioCpf: '',
    UsuarioEmail: '',
    CadastroUsuario: '',
    LoginStatus: '',
    Load: false,
    RecuperaSenha: '0',
    StatusNovaSenha: '0'

}


export default (state = defaultState, action) => {

    switch (action.type) {
        case "GET_USUARIO_CPF":
            return {
                ...state,
                UsuarioCpf: action.UsuarioCpf
            }

        case "GET_USUARIO_EMAIL":
            return {
                ...state,
                UsuarioEmail: action.UsuarioEmail
            }
        case "CADASTRO_USUARIO":
            return {
                ...state,
                CadastroUsuario: action.CadastroUsuario
            }

        case "LOGIN":
            return {
                ...state,
                LoginStatus: action.LoginStatus
            }

        case "LOGIN_ERRO":
            return {
                ...state,
                LoginStatus: action.LoginStatus
            }
        case "RECUPERA_SENHA":
            return {
                ...state,
                RecuperaSenha: action.RecuperaSenha
            }

        case "RECUPERA_SENHA_ERRO":
            return {
                ...state,
                RecuperaSenha: action.RecuperaSenha
            }

        case "MUDAR_SENHA":
            return {
                ...state,
                StatusNovaSenha: action.StatusNovaSenha
            }

        case "MUDAR_SENHA_ERRO":
            return {
                ...state,
                StatusNovaSenha: action.StatusNovaSenha
            }
        case "LOAD":
            return {
                ...state,
                Load: action.Load
            }

        default:
            return state;
    }
}
