import axios from 'axios'
import { MudarSenhaDTO } from './Model/MudarSenhaDTO';
import {UserProfile} from './UserProfile/UserProfile'

const URL_Usuario = 'api/usuario/'

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export function GetCpf(cpf) {
    return async (dispatch) => {
        return await axios.get(URL_Usuario + 'GetCpf/' + cpf).then((response) => {
            dispatch(SetUsuarioCpf(response.data))
        })
    }
}

export function SetUsuarioCpf(data) {
    return {
        type: 'GET_USUARIO_CPF',
        UsuarioCpf: data
    }
}

export function GetEmail(email) {
    return async (dispatch) => {
        return await axios.get(URL_Usuario + 'GetEmail/' + email).then((response) => {
            dispatch(SetUsuarioEmail(response.data))
        })
    }
}

export function SetUsuarioEmail(data) {
    return {
        type: 'GET_USUARIO_EMAIL',
        UsuarioEmail: data
    }
}

export function CadastrarUsuario(cadastroDTO) {

    return async (dispatch) => {
        dispatch(SetLoad(true))
        return await axios({
            method: 'post',
            url: URL_Usuario,
            data: cadastroDTO,
            headers: axiosConfig
        }).then((res) => {
            dispatch(SetCadastrarUsuario(res.data))
            dispatch(SetLoad(false))
        }).catch((error) => {
            dispatch(SetCadastrarUsuarioErro(error.data))
            dispatch(SetLoad(false))
        })
    }
}

export function SetLoad(data) {
    return {
        type: 'LOAD',
        Load: data
    }
}

export function SetCadastrarUsuario(data) {
    return {
        type: 'CADASTRO_USUARIO',
        CadastroUsuario: '200'
    }
}

export function SetCadastrarUsuarioErro(data) {
    return {
        type: 'CADASTRO_USUARIO',
        CadastroUsuario: '400'
    }
}

export function Login(email, senha) {

    return async (dispatch) => {
        dispatch(SetLoad(true))
        return await axios.get(URL_Usuario + 'GetUsuario/' + email + '/senha/' + senha).then((response) => {
            dispatch(SetLogin(email))
            dispatch(SetLoad(false))
        }).catch((error) => {
            dispatch(SetLoginErro())
            dispatch(SetLoad(false))
        })
    }
}

export function SetLogin(email) {

    var userProfile = new UserProfile(email);
    userProfile.SetLoginStorage();

    return {
        type: 'LOGIN',
        LoginStatus: '200'
    }
}

export function SetLoginErro() {
    return {
        type: 'LOGIN_ERRO',
        LoginStatus: '404'
    }
}

export function RecuperarSenha(email) {
    return async (dispatch) => {
        dispatch(SetLoad(true))
        return await axios.get(URL_Usuario + 'RecuperarSenha/' + email).then((response) => {
            dispatch(SetRecuperarSenha(response.data))
            dispatch(SetLoad(false))
        }).catch((error) => {
            dispatch(SetRecuperarSenhaErro(error.response.data))
            dispatch(SetLoad(false))
        })
    }
}

export function SetRecuperarSenha(data) {
    return {
        type: 'RECUPERA_SENHA',
        RecuperaSenha: data
    }
}

export function SetRecuperarSenhaErro(data) {
    return {
        type: 'RECUPERA_SENHA_ERRO',
        RecuperaSenha: data
    }
}

export function MudarSenha(MudarSenhaDTO) {
    return async (dispatch) => {
        dispatch(SetLoad(true))
        return await axios({
            method: 'put',
            url: URL_Usuario + 'MudarSenha',
            data: MudarSenhaDTO,
            headers: axiosConfig
        }).then((res) => {
            dispatch(SetMudarSenha(res.status))
            dispatch(SetLoad(false))
        }).catch((error) => {
            dispatch(SetMudarSenhaErro(error.status))
            dispatch(SetLoad(false))
        })
    }
}

export function SetMudarSenha(data) {
    return {
        type: 'MUDAR_SENHA',
        StatusNovaSenha: data
    }
}

export function SetMudarSenhaErro(data) {
    return {
        type: 'MUDAR_SENHA_ERRO',
        StatusNovaSenha: data
    }
}