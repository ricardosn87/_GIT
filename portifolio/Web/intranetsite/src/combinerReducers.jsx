import { combineReducers } from 'redux'
import UsuarioReducer from './Usuario/UsuarioReducer'
import EmpresaReducer from './Gerenciamento/Empresa/EmpresaReducer'
import {reducers as reducersPagination} from './Controls/TablePagination/TablePaginationReducer'

const rootReducer = combineReducers({
    UsuarioState: UsuarioReducer,
    EmpresaState: EmpresaReducer,
    reducersPagination
})
export default rootReducer