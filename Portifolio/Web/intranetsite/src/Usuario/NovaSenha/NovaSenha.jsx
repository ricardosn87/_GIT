import validator from 'validator';
import { Component } from 'react';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QueryString from 'query-string'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as Actions from '../UsuarioActions';
import { ValidarCpf } from './../../Util/Validacao/ValidarCpf';
import { MudarSenhaDTO } from '../Model/MudarSenhaDTO'
import { Link } from "react-router-dom";

class NovaSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsInvalidSenha: false,
            IsInvalidConfirmaSenha: false,
            IsInvalidCPF: false,

            ValorSenha: '',
            ValorConfirmaSenha: '',
            ValorCPF: '',
            FlagMudarSenha: false,

            Key: null,

            KeyInvalid: false
        }

        this.SetOnChangeValidateSenha = this.SetOnChangeValidateSenha.bind(this);
        this.SetOnChangeValidateConfirmaSenha = this.SetOnChangeValidateConfirmaSenha.bind(this);
        this.SetOnClickMudarSenha = this.SetOnClickMudarSenha.bind(this);
        this.SetOnChangeValidateCPF = this.SetOnChangeValidateCPF.bind(this);
    }

    componentDidMount() {

        const values = QueryString.parse(this.props.location.search)

        if (values.key !== undefined || values.key !== "" || values.key !== null) {
            this.setState({
                Key: values.key,
                KeyInvalid: false
            })
        }
        else {
            this.setState({
                KeyInvalid: true
            })
        }
    }

    SetOnChangeValidateCPF = (e) => {

        if (validator.isEmpty(e) || ValidarCpf.cpf(e) === false) {
            this.setState({
                IsInvalidCPF: true,
                FlagMudarSenha: true,
                ValorCPF: e

            })
        }
        else {
            this.props.GetCpf(e)
            this.setState({
                IsInvalidCPF: false,
                FlagMudarSenha: true,
                ValorCPF: e
            })
        }
    }


    SetOnChangeValidateSenha = (e) => {
        if (validator.isEmpty(e)) {
            this.setState({
                IsInvalidSenha: true,
                ValorSenha: e,
                FlagMudarSenha: true
            })
        }
        else {
            this.setState({
                IsInvalidSenha: false,
                ValorSenha: e,
                FlagMudarSenha: true
            })
        }
    }

    SetOnChangeValidateConfirmaSenha = (e) => {
        if (validator.isEmpty(e)) {
            this.setState({
                IsInvalidConfirmaSenha: true,
                ValorConfirmaSenha: e,
                FlagMudarSenha: true
            })
        }
        else {
            this.setState({
                IsInvalidConfirmaSenha: false,
                ValorConfirmaSenha: e,
                FlagMudarSenha: true
            })
        }
    }

    SetOnClickMudarSenha() {


        if (this.state.FlagMudarSenha && !this.state.IsInvalidSenha && !this.state.IsInvalidConfirmaSenha && !this.state.IsInvalidCPF) {
            var mudarSenhaDTO = new MudarSenhaDTO(this.state.ValorCPF, this.state.Key, this.state.ValorSenha);
            this.props.MudarSenha(mudarSenhaDTO);
        }
        else if (!this.state.FlagMudarSenha) {
            this.setState({
                IsInvalidConfirmaSenha: true,
                IsInvalidSenha: true,
                IsInvalidCPF: true,
                FlagMudarSenha: true
            })
        }
    }

    render() {

        const { ExisteCPF, StatusNovaSenha, Load } = this.props

        return (
            <div style={{ width: 800, margin: 50, paddingLeft: 500 }} >
                <div className="container">

                    {this.state.KeyInvalid === false &&
                        <div>
                            <div className="form-group row">
                                <div className="col align-self-center">
                                    <label>CPF</label>
                                    <input
                                        value={this.state.ValorCPF}
                                        onChange={valor => this.SetOnChangeValidateCPF(valor.target.value)}
                                        className={"form-control " + (this.state.IsInvalidCPF || (ExisteCPF === '' && this.state.ValorCPF.length === 11) ? 'is-invalid' : '')}
                                        type="text" placeholder="CPF" />

                                    {ExisteCPF === '' && this.state.ValorCPF.length === 11 &&
                                        <div class="invalid-feedback">
                                            CPF Inexistente!
                           </div>
                                    }

                                    {this.state.ValorCPF.length !== 11 &&
                                        <div class="invalid-feedback">
                                            CPF invalido!
                           </div>
                                    }

                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col align-self-center">
                                    <label>Nova Senha</label>
                                    <input
                                        value={this.state.ValorSenha}
                                        onChange={valor => this.SetOnChangeValidateSenha(valor.target.value)}
                                        className={"form-control " + (this.state.IsInvalidSenha ? 'is-invalid' : '')}
                                        type="text" placeholder="Senha" />
                                    <div class="invalid-feedback">
                                        Senha Invalida!
                        </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col align-self-center">
                                    <label>Confirma Senha</label>
                                    <input
                                        onChange={valor => this.SetOnChangeValidateConfirmaSenha(valor.target.value)}
                                        className={"form-control " + (this.state.IsInvalidConfirmaSenha ? 'is-invalid' : '')}
                                        type="text" placeholder="Confirma Senha" />
                                    <div class="invalid-feedback">
                                        Senha Invalida!
                        </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col align-self-center">
                                    <button
                                        onClick={this.SetOnClickMudarSenha}
                                        class="btn btn-primary"
                                        type="button">Mudar a Senha</button>
                                </div>
                            </div>
                        </div>

                    }

                    {this.state.KeyInvalid === true &&
                        <div class="alert alert-danger" role="alert">
                            Não foi possível concluir a operação!
                       </div>
                    }

                    {Load && <div>
                        <div className="loader">Loading...</div>
                    </div>
                    }

                    {StatusNovaSenha === 500 &&
                        <div class="alert alert-danger" role="alert">
                            Não foi possível concluir a operação!
                       </div>
                    }

                    {StatusNovaSenha === 200 &&
                        <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Sucesso!</h4>
                        <p>Senha alterada com sucesso, favor realizar o Login neste <Link to="/Login">Link</Link></p>
                        <hr />
                    </div>
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ExisteCPF: state.UsuarioState.UsuarioCpf,
        Load: state.UsuarioState.Load,
        StatusNovaSenha: state.UsuarioState.StatusNovaSenha
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NovaSenha);