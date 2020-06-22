import { combineReducers } from 'redux'
import UsuarioReducer from './Usuario/UsuarioReducer'
import EmpresaReducer from './Gerenciamento/Empresa/EmpresaReducer'
import FuncionarioReducer from './Gerenciamento/Funcionario/FuncionarioReducer'
import { reducers as reducersPagination } from './Controls/TablePagination/TablePaginationReducer'

const rootReducer = combineReducers({
    UsuarioState: UsuarioReducer,
    EmpresaState: EmpresaReducer,
    FuncionarioState: FuncionarioReducer,
    reducersPagination
})
export default rootReducer