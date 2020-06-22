let defaultState = {
    EmailExisteStatus: 0,
    CPFExisteStatus: 0,
    SaveFuncionario: null,
    ListFilterGetAllEmployees: [],
    ListFilterGetAllEmployeesErro: null,
    EmployeeChoose: null,
    EmployeeEmailChoose: null,
    EmployeeCPFChoose: null,
    EmployeeCompanyChoose: null,
    EmployeeDataInitChoose: null,
    EmployeeDataEndChoose: null,
    UpdateEmployeeState:null,
    EmployeeChoosePositionTable: 1
}


export default (state = defaultState, action) => {
    switch (action.type) {
        case "GET_EMAIL_EXIST":
            return {
                ...state,
                EmailExisteStatus: action.EmailExisteStatus
            }
        case "GET_CPF_EXIST":
            return {
                ...state,
                CPFExisteStatus: action.CPFExisteStatus
            }

        case "SAVE_FUNCIONARIO": {
            return {
                ...state,
                SaveFuncionario: action.SaveFuncionario
            }
        }
        case "GET_ALL_EMPLOYEES": {
            return {
                ...state,
                ListFilterGetAllEmployees: action.ListFilterGetAllEmployees
            }
        }
        case "GET_ALL_EMPLOYEES_ERRO": {
            return {
                ...state,
                ListFilterGetAllEmployeesErro: action.ListFilterGetAllEmployeesErro
            }
        }
        case "FILTER_EMPLOYEE_CHOOSE": {
            return {
                ...state,
                EmployeeChoose: action.EmployeeChoose
            }
        }
        case "FILTER_EMPLOYEE_EMAIL_CHOOSE": {
            return {
                ...state,
                EmployeeEmailChoose: action.EmployeeEmailChoose
            }
        }
        case "FILTER_EMPLOYEE_CPF_CHOOSE": {
            return {
                ...state,
                EmployeeCPFChoose: action.EmployeeCPFChoose
            }
        }
        case "FILTER_EMPLOYEE_COMPANY_CHOOSE": {
            return {
                ...state,
                EmployeeCompanyChoose: action.EmployeeCompanyChoose
            }
        }
        case "FILTER_EMPLOYEE_DATAINIT_CHOOSE": {
            return {
                ...state,
                EmployeeDataInitChoose: action.EmployeeDataInitChoose
            }
        }
        case "FILTER_EMPLOYEE_DATAEND_CHOOSE": {
            return {
                ...state,
                EmployeeDataEndChoose: action.EmployeeDataEndChoose
            }
        }
        case "UPDATE_EMPLOYEE": {
            return {
                ...state,
                UpdateEmployeeState: action.UpdateEmployeeState
            }
        }
        case "CHOOSE_EMPLOYEE_POSITION": {
            return {
                ...state,
                EmployeeChoosePositionTable: action.EmployeeChoosePositionTable
            }
        }
        default:
            return state;
    }
}