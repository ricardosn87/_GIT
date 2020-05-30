import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cadastro from './Login/Cadastro/Cadastro'


import reducers from './CombinerReducers'
import { applyMiddleware, createStore } from 'redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(thunk,promise)(createStore)(reducers, devTools) 


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" exact={true} component={App} />
            <Route path="/Cadastro" component={Cadastro} />
        </BrowserRouter>

    </Provider>
    , document.getElementById('app'))