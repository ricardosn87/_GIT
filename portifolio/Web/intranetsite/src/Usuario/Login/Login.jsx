import { Component } from "react";
import * as React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../UsuarioActions';
import { ValidarEmail } from './../../Util/Validacao/ValidarEmail';
import '../../Util/Load/loading.css'
import { Redirect } from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessagemEmail: true,
            Email: '',
            Senha: '',
        };

        this.SetEmail = this.SetEmail.bind(this)
        this.SetSenha = this.SetSenha.bind(this)
    }

    SetEmail = (e) => {

        if (ValidarEmail.ValidateEmail(e.target.value) === false) {
            this.setState({
                errorMessagemEmail: false
            })
        }
        else {
            this.setState({
                errorMessagemEmail: true
            })
        }

        this.setState({
            Email: e.target.value
        })
    }

    SetSenha = (e) => {
        this.setState({
            Senha: e.target.value
        })
    }

    componentDidMount() {

    }

    render() {

        const { LoginStatus, Load } = this.props
        let userLogado = localStorage.getItem('login');

        if (LoginStatus === '200' && userLogado != null) {
            return (<Redirect to="/Gerenciamento" />)
        }


        return (
            <div style={{ width: 800, margin: 50, paddingLeft: 500 }} >
                <div className="container">
                    <div className="form-group row">
                        <div className="col align-self-center">
                            <input className="form-control" type="email" placeholder="Email" onChange={valor => this.SetEmail(valor)} value={this.state.Email} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col align-self-center">
                            <input className="form-control" type="password" placeholder="Senha" onChange={valor => this.SetSenha(valor)} value={this.state.Senha} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col align-self-center">
                            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => this.props.Login(this.state.Email, this.state.Senha)} >Entrar</button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col align-self-center">
                           <Link to="/RecuperacaoSenha">Esqueceu a Senha?</Link>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col align-self-center">
                            Novo no sistema? <Link to="/Cadastro">Cadastra-se</Link>
                        </div>
                    </div>
                    <div hidden={this.state.errorMessagemEmail} className="alert alert-warning" role="alert">
                        * Email Invalido.
                        </div>
                    <div hidden={LoginStatus === '404' ? false : true} className="alert alert-warning" role="alert">
                        * Login não encontrado.
                    </div>

                </div>

                {Load &&
                    <div>
                        <div className="loader">Loading...</div>
                    </div>
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        LoginStatus: state.UsuarioState.LoginStatus,
        Load: state.UsuarioState.Load
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login) 
