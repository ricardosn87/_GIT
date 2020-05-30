import axios from 'axios'
import { UserProfile } from '../../Usuario/UserProfile/UserProfile'

const URL_Empresa = 'api/empresa/'

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export function GetByCNPJ(cnpj) {

    return async (dispatch) => {
        dispatch(SetLoad(true))
        return await axios.get(URL_Empresa + 'GetByCNPJ/' + cnpj).then((response) => {
            dispatch(SetGetByCNPJ(response.data))
            dispatch(SetLoad(false))
        })
    }
}

export function SetGetByCNPJ(data) {
    return {
        type: 'GET_COMPANY_BY_CNPJ',
        EmpresaGetByCNPJ: data
    }
}

export function SetLoad(data) {
    return {
        type: 'LOAD',
        Load: data
    }
}

export function ActionCadastrarEmpresa(empresaDTO) {

    return async (dispatch) => {
        dispatch(SetLoad(true))
        return await axios({
            method: 'post',
            url: URL_Empresa,
            data: empresaDTO,
            headers: axiosConfig
        }).then((res) => {
            dispatch(SetCadastrarEmpresa())
            ActionCadastrarUsuarioEmpresa(res.data);
            dispatch(SetLoad(false))
        }).catch((error) => {
            dispatch(SetCadastrarEmpresaErro(error.data))
            dispatch(SetLoad(false))
        })
    }
}

async function ActionCadastrarUsuarioEmpresa(empresa) {
    var userProfile = new UserProfile();
    let email = userProfile.GetLoginStorage();
    let cnpj = empresa.cnpj

    await axios.post(URL_Empresa + 'SaveUsuarioEmpresa/email/' + email + '/cnpj/' + cnpj);
}

export function SetCadastrarEmpresa() {
    return {
        type: 'CADASTRO_EMPRESA',
        CadastroEmpresa: true
    }
}

export function SetCadastrarEmpresaErro(data) {
    return {
        type: 'CADASTRO_EMPRESA_ERRO',
        CadastroEmpresaErro: true
    }
}

export function ActionSetReducer() {
    return {
        type: 'RESET_REDUCER'

    }
}

export function ActionTentarNovamente() {
    return {
        type: 'TENTAR_NOVAMENTE'
    }
}

export function ActionGetAllEmpresaByEmail(email) {

   

    return async (dispatch) => {
        dispatch(SetLoad(true))
        return await axios.get(URL_Empresa + 'GetAllEmpresaByEmail/' + email).then((response) => {
            dispatch(SetGetAllEmpresaByEmail(response.data))
            dispatch(SetLoad(false))
        })
    }
}

export function SetGetAllEmpresaByEmail(data) {
    return {
        type: 'GET_LISTA_EMPRESA_BY_EMAIL',
        ListaEmpresa: data
    }
}
