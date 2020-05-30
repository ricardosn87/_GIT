const INITIAL_STATE = {
    UsuarioExiste: true,
    UsuarioCPF: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CADASTRARUSUARIO":
            return { ...state, UsuarioExiste: action.payload };
        case "GET_CPF":
            return { ...state, UsuarioCPF: action.payload };       
        default:
            return state;
    }
}
