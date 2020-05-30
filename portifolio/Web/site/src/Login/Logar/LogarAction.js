import axios from 'axios'


//const URL_Usuario = 'https://localhost:44351/api/usuario/'
const URL_Usuario = 'api/usuario/'

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export const CadastrarUsuario = (cadastroDTO) => {

    axios({
        method: 'post',
        url: URL_Usuario,
        data: cadastroDTO,
        headers: axiosConfig
    }).then((res) => {
        console.log('RECEBIDO: ' + res.data)
    }).catch((error) => {
        alert('ERRO : ' + error)
    })
}


export const GetCPF = async (cpf) => {
        const response = await axios.get(URL_Usuario + 'GetCpf/' + cpf);        
        SetCpf(response.data)       
}

export const SetCpf = (response) => {
    return dispatch => {
        dispatch({ payload: response.cpf, type: 'GET_CPF' })
    }
}

