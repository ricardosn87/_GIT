import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './App.css';
import { CadastrarUsuario } from './Login/Logar/LogarAction'
import Logar from './Login/Logar/Logar'
import MenuInicial from './MenuInicial/MenuInicial';

import { BrowserRouter,Switch, Route } from 'react-router-dom'


class App extends Component {

  render() {

    const { LogarUsuario, UsuarioExiste } = this.props

    return (

      <div className="App">
       
          <MenuInicial />
          <Logar />
      
      </div>
    )
  }
}

const mapStateToProps = state => ({
  UsuarioExiste: state.LogarState.UsuarioExiste
})
const mapDispatchToProps = dispatch => bindActionCreators({ CadastrarUsuario }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)

