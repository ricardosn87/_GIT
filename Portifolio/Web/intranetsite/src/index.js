import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { applyMiddleware } from "redux"
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter,  Route } from 'react-router-dom'
import reducers from './combinerReducers'

import Cadastro from './Usuario/Cadastro/Cadastro'
import Gerenciamento from './Gerenciamento/Gerenciamento'
import RecuperacaoSenha from './Usuario/RecuperacaoSenha/RecuperacaoSenha'
import NovaSenha from './Usuario/NovaSenha/NovaSenha'
import Login from './Usuario/Login/Login'




let store = createStore(reducers, applyMiddleware(thunk))


ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <Route path = "/" exact = { true }  component = { App } /> 
    <Route path = "/Cadastro" component = { Cadastro } />
    <Route path = "/RecuperacaoSenha" component = { RecuperacaoSenha }/>
    <Route path = "/NovaSenha"  component = { NovaSenha }  />
    <Route path = "/Gerenciamento" component = { Gerenciamento }/>
    <Route path = "/Login" component = { Login }/>
    </BrowserRouter >
    </Provider>,
    document.getElementById('root')
    );
     
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();