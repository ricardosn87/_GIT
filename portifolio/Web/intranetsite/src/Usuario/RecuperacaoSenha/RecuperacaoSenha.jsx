import { Component } from "react";
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../UsuarioActions';
import { ValidarEmail } from './../../Util/Validacao/ValidarEmail';
import '../../Util/Load/loading.css'
import { Link } from "react-router-dom";
import '/_GIT/Portifolio/Web/intranetsite/src/App.css'

class ReceperacaoSenha extends Component {

    constructor(props) {
        super(props);



        this.state = {
            errorMessagemEmail: true,
            errorMessagemEmailNaoExiste: true,
            Email: '',
            TelaInicial: '0'
        };

        this.SetEmail = this.SetEmail.bind(this)
        this.SetRecuperarSenha = this.SetRecuperarSenha.bind(this)
    }

    componentDidMount(){
        this.setState({
            TelaInicial:0
        })
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


    SetRecuperarSenha = (e) => {
        this.props.RecuperarSenha(e)
    }

    render() {

        const { RecuperaSenha, Load } = this.props

        return (
            <div>
                <div style={{ width: 800, margin: 50, paddingLeft: 500 }} >                
                    <label>Recuperar Senha</label>
                    {this.state.TelaInicial === 0 &&
                        <div>
                            <div className="form-group row">
                                <div className="col align-self-center">
                                    <input className="form-control" type="email" placeholder="Email" onChange={valor => this.SetEmail(valor)} value={this.state.Email} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col align-self-center">
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => this.SetRecuperarSenha(this.state.Email)}>Recuperar Senha</button>
                                </div>
                            </div>
                            <div hidden={this.state.errorMessagemEmail} className="alert alert-warning" role="alert">
                                * Email Invalido.
                           </div>
                        </div>

                    }
                    {Load &&
                        <div>
                            <div className="loader">Loading...</div>
                        </div>
                    }

                    {RecuperaSenha === 200 &&
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Sucesso!</h4>
                            <p>Recuperação de Senha feita com sucesso, favor entrar no email e seguir as instruções.</p>
                            <hr />
                        </div>
                    }

                    {RecuperaSenha === 404 &&
                        <div className="alert alert-warning" role="alert">
                            * Email não existe, favor se <Link to="/Cadastro">Cadastra-se</Link>
                        </div>
                    }
                     {RecuperaSenha === 500 &&
                        <div className="alert alert-danger" role="alert">
                            * Erro inesperado, favor realizar o procedimento mais tarde.
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        RecuperaSenha: state.UsuarioState.RecuperaSenha,
        Load: state.UsuarioState.Load
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceperacaoSenha) 
