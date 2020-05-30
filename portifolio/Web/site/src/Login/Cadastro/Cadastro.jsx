import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { ValidarCpf } from './../../Util/Validacao/ValidarCpf';
import { ValidarEmail } from "../../Util/Validacao/ValidarEmail";
import { CadastrarUsuario,GetCPF } from '../Logar/LogarAction'
import { CadastroDTO } from './../Model/CadastroDTO';
/* 
interface ICadastroProps {
    
}

export interface ICadastroState {

    UsuarioCPF: CadastroDTO[]

    errorMessagemCPF: boolean
    errorMessagemEmail: boolean
    errorMessagemSenha: boolean

    CPF: string
    Email: string
    Senha: string
} */

class Cadastro extends Component {

    constructor(props) {
        super(props);

        this.state = {



            errorMessagemCPF: true,
            errorMessagemEmail: true,
            errorMessagemSenha: true,
            errorMessagemCPFExiste: true,

            CPF: '',
            Email: '',
            Senha: '',
            UsuarioCPF:''
        };

        this.ValidarFormCPF = this.ValidarFormCPF.bind(this)
        this.ValidarFormEmail = this.ValidarFormEmail.bind(this)
        this.ValidarFormSenha = this.ValidarFormSenha.bind(this)
        this.CadastrarUsuario = this.CadastrarUsuario.bind(this)      
    }


    ValidarFormCPF = (e) => {

        const { UsuarioCPF } = this.props

        if (ValidarCpf.cpf(e.target.value) === false) {
            this.setState({
                errorMessagemCPF: false,
                errorMessagemCPFExiste: true
            })
        }
        else {
            this.setState({
                errorMessagemCPF: true
            })

            this.props.GetCPF(e.target.value)
            if (this.state.UsuarioCPF !== '') {
                this.setState({
                    errorMessagemCPFExiste: false
                })
            }
            else{
                this.setState({
                    errorMessagemCPFExiste: true
                })
            }
        }

        this.setState({
            CPF: e.target.value
        })
    }

    ValidarFormEmail = (e) => {
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
        CadastrarUsuario(cadastroDTO);
    }

    render() {        

        return (
            <div style={{ width: 800, margin: 50, paddingLeft: 500 }} >
                <div className="container">
                    <h1>Tela Cadastro!</h1>
                </div>
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
                <div id="divAlertaErroCPF" hidden={this.state.errorMessagemCPF} className="alert alert-warning" role="alert">
                    * CPF Invalido.
               </div>
                <div id="divAlertaErroEmail" hidden={this.state.errorMessagemEmail} className="alert alert-warning" role="alert">
                    * Email Invalido.
               </div>

                <div id="divAlertaErroEmail" hidden={this.state.errorMessagemCPFExiste} className="alert alert-warning" role="alert">
                    * CPF existente.
               </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        UsuarioExiste: state.LogarState.UsuarioExiste,
        UsuarioCPF: state.LogarState.UsuarioCPF
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({ CadastrarUsuario, GetCPF }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Cadastro)

