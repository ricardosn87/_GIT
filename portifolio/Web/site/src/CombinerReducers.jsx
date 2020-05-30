import {combineReducers} from 'redux'
import LogarReducer from './Login/Logar/LogarReducer'


const rootReducer = combineReducers ({
      LogarState: LogarReducer
})
 export default rootReducer