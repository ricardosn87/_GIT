import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as Actions from '../UsuarioActions';
import { ValidarCpf } from './../../Util/Validacao/ValidarCpf';
import { ValidarEmail } from './../../Util/Validacao/ValidarEmail';
import { CadastroDTO } from './../Model/CadastroDTO';

import '../../Util/Load/loading.css'
import { Link } from "react-router-dom";




class Cadastro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessagemSenha: true,

            errorMessagemCPF: true,
            errorMessagemCPFExiste: true,
            errorMessagemEmail: true,
            errorMessagemEmailExiste: true,

            CPF: '',
            Email: '',
            Senha: '',
            Usuario: ''
        };

        this.ValidarFormCPF = this.ValidarFormCPF.bind(this)
        this.ValidarFormEmail = this.ValidarFormEmail.bind(this)
        this.ValidarFormSenha = this.ValidarFormSenha.bind(this)
        this.CadastrarUsuario = this.CadastrarUsuario.bind(this);
    }



    ValidarFormCPF = (e) => {
       

        if (ValidarCpf.cpf(e.target.value) === false) {
            this.setState({
                errorMessagemCPF: false,
                errorMessagemCPFExiste: true
            })
        }
        else {
            this.setState({
                errorMessagemCPF: true,
                errorMessagemCPFExiste: false
            })

            this.props.GetCpf(e.target.value)
        }
        this.setState({
            CPF: e.target.value
        })
    }

    ValidarFormEmail = (e) => {
        if (ValidarEmail.ValidateEmail(e.target.value) === false) {
            this.setState({
                errorMessagemEmail: false,
                errorMessagemEmailExiste: true
            })
        }
        else {
            this.setState({
                errorMessagemEmail: true,
                errorMessagemEmailExiste: false
            })

            this.props.GetEmail(e.target.value)
        }
        this.setState({
            Email: e.target.value
        })
    }

    ValidarFormSenha = (e) => {
        if (e.target.value === '') {
            this.setState({
                errorMessagemSenha: false
            })
        }
        else if (e.target.value === undefined) {
            this.setState({
                errorMessagemSenha: false
            })
        }
        else if (e.target.value === null) {
            this.setState({
                errorMessagemSenha: false
            })
        }

        this.setState({
            Senha: e.target.value
        })
    }

    CadastrarUsuario() {
        let cadastroDTO = new CadastroDTO(this.state.CPF, this.state.Email, this.state.Senha);
        this.props.CadastrarUsuario(cadastroDTO);
    }

    render() {

        const { UsuarioCpf, UsuarioEmail, CadastroUsuario, Load } = this.props

        return (

            <div style={{ width: 800, margin: 50, paddingLeft: 500 }} >
                <div className="container">
                    <h1>Tela Cadastro!</h1>
                </div>

                {CadastroUsuario === '' &&

                    <div>
                        <div>
                            <form>
                                <div className="form-group">
                                    <label>CPF</label>
                                    <input type="text" className="form-control" id="txtCPF" onChange={valor => this.ValidarFormCPF(valor)} value={this.state.CPF} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="txtEmail" onChange={valor => this.ValidarFormEmail(valor)} value={this.state.Email} />
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input type="password" className="form-control" id="txtSenha" onChange={valor => this.ValidarFormSenha(valor)} value={this.state.Senha} />
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.CadastrarUsuario}>Cadastrar</button>
                                </div>
                            </form>
                        </div>


                        <div hidden={this.state.errorMessagemCPF} className="alert alert-warning" role="alert">
                            * CPF Invalido.
               </div>
                        {!this.state.errorMessagemCPFExiste && UsuarioCpf !== '' &&
                            <div className="alert alert-warning" role="alert">
                                * CPF existente.
                   </div>
                        }

                        <div hidden={this.state.errorMessagemEmail} className="alert alert-warning" role="alert">
                            * Email Invalido.
               </div>
                        {!this.state.errorMessagemEmailExiste && UsuarioEmail !== '' &&
                            <div className="alert alert-warning" role="alert">
                                * Email existente.
                </div>
                        }

                    </div>

                }
                
                {CadastroUsuario === '200' &&

                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Sucesso!</h4>
                        <p>Cadastro feito com sucesso, favor realizar o Login neste <Link to="/Login">Link</Link></p>
                        <hr />
                    </div>

                }

                {CadastroUsuario === '400' &&

                    <div className="alert alert-warning" role="alert">
                        <h4 className="alert-heading">Erro!</h4>
                        <p>Favor entrar em contato com o SAC - 0800 -777- 888.</p>
                        <hr />
                    </div>
                }

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
        UsuarioCpf: state.UsuarioState.UsuarioCpf,
        UsuarioEmail: state.UsuarioState.UsuarioEmail,
        CadastroUsuario: state.UsuarioState.CadastroUsuario,
        Load: state.UsuarioState.Load
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro)    