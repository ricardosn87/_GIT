import axios from 'axios'

const URL_Funcionario = 'api/funcionario/'
const URL_Usuario = 'api/usuario/'

export async function GetFuncionarioByEmail(dispatch, email) {

    try {
        const response = await axios.get(URL_Funcionario + 'GetFuncionarioByEmail/' + email)
        dispatch({
            type: 'GET_EMAIL_EXIST',
            EmailExisteStatus: response.status
        })
    } catch (error) {
        dispatch({
            type: 'GET_EMAIL_EXIST',
            EmailExisteStatus: error.response.status
        })
    }
}

export async function GetFuncionarioByCPF(dispatch, CPF) {

    try {
        const response = await axios.get(URL_Funcionario + 'GetFuncionarioByCPF/' + CPF)
        dispatch({
            type: 'GET_CPF_EXIST',
            CPFExisteStatus: response.status
        })
    } catch (error) {
        dispatch({
            type: 'GET_CPF_EXIST',
            CPFExisteStatus: error.response.status
        })
    }
}

export async function ActionSaveFuncionario(dispatch, saveFuncionarioDTO) {

    const employ = {
        Cpf: saveFuncionarioDTO.Cpf,
        Senha: saveFuncionarioDTO.Senha,
        Email: saveFuncionarioDTO.Email,
        Nome: saveFuncionarioDTO.Nome,
        IdEmpresa: saveFuncionarioDTO.IdEmpresa
    }

    try {
        const response = await axios.post(URL_Funcionario, employ)
        dispatch({
            type: 'SAVE_FUNCIONARIO',
            SaveFuncionario: response.status
        })
    } catch (error) {
        dispatch({
            type: 'SAVE_FUNCIONARIO',
            SaveFuncionario: error.response.status
        })
    }
}

export async function FilterGetAllEmployees(dispatch, FilterGetAllEmployeesDTO) {


    const filterGetAllEmployeesDTO = {
        EmailUsuario: FilterGetAllEmployeesDTO.EmailUsuario,
        Cpnj: FilterGetAllEmployeesDTO.Cpnj,
        RazaoSocial: FilterGetAllEmployeesDTO.RazaoSocial,
        NomeFantasia: FilterGetAllEmployeesDTO.NomeFantasia,
        Ativo: FilterGetAllEmployeesDTO.Ativo,
        Cpf: FilterGetAllEmployeesDTO.Cpf,
        DataCadastro: FilterGetAllEmployeesDTO.DataCadastro,
        DataBloqueio: FilterGetAllEmployeesDTO.DataBloqueio,
        Admin: FilterGetAllEmployeesDTO.Admin,
        EmailFuncionario: FilterGetAllEmployeesDTO.EmailFuncionario,
        NomeFuncionario: FilterGetAllEmployeesDTO.NomeFuncionario,
        FuncionarioAtivo: FilterGetAllEmployeesDTO.FuncionarioAtivo,
    }

    try {
        const response = await axios.post(URL_Usuario + 'FilterGetAllEmployees', filterGetAllEmployeesDTO)

        dispatch({
            type: 'GET_ALL_EMPLOYEES',
            ListFilterGetAllEmployees: response.data
        })

    } catch (error) {
        dispatch({
            type: 'GET_ALL_EMPLOYEES_ERRO',
            ListFilterGetAllEmployeesErro: error.response.status
        })
    }
}

export async function ActionUpdateEmployee(dispatch,EmployeeUpdateDTO) {
    const dados = {
        CPF: EmployeeUpdateDTO.CPF,
        Nome:EmployeeUpdateDTO.Nome,
        Email:EmployeeUpdateDTO.Email,
        IdEmpresa:EmployeeUpdateDTO.IdEmpresa
    }

    try {
        const response = await axios.put(URL_Funcionario + 'UpdateEmployee', dados)
        dispatch({
            type: 'UPDATE_EMPLOYEE',
            UpdateEmployeeState: response.data
        })
    } catch (error) {
        dispatch({
            type: 'UPDATE_EMPLOYEE',
            UpdateEmployeeState: false
        })
    }
}