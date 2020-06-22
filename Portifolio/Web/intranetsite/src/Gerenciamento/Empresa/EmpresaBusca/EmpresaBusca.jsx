import { Component } from 'react';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import validator from 'validator';
import { ValidarCNPJ } from '../../../Util/Validacao/ValidarCNPJ'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as Actions from '../EmpresaActions'
import { EmpresaDTO } from '../Model/EmpresaDTO'

import '../../../Util/Load/loading.css'
import { UserProfile } from './../../../Usuario/UserProfile/UserProfile';



class EmpresaBusca extends Component {
    constructor(props) {
        super(props);
        this.state = {

            show: false,

            ValorCNPJ: '',
            ValorCNPJStatus: false,
            ValorRazaoSocial: '',
            ValorNomeFantasia: '',

            IsInvalidCNPJ: false,
            IsInvalidCNPJExistente: false,
            IsInvalidRazaoSocial: false,
            IsInvalidNomeFantasia: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.SetOnChangeValidateCNPJ = this.SetOnChangeValidateCNPJ.bind(this);
        this.SetCadastrarEmpresa = this.SetCadastrarEmpresa.bind(this);
        this.SetResetReducer = this.SetResetReducer.bind(this);
        this.SetTentarNovamente = this.SetTentarNovamente.bind(this);
    }

    componentDidMount() {
        this.setState({
            FirstClick: true
        })
    }

    handleClose() {
        this.setState({
            show: false,
            IsInvalidCNPJ: false,
            IsInvalidRazaoSocial: false,
            IsInvalidNomeFantasia: false,
            ValorCNPJ: '',
            ValorRazaoSocial: '',
            ValorNomeFantasia: '',
            ValorCNPJStatus: false,
            FirstClick: true

        })

        this.SetResetReducer()
    }

    handleShow() {
        this.setState({
            show: true
        })
    }

    SetResetReducer() {
        this.props.ActionSetReducer();
        var userProfile = new UserProfile();
        let email = userProfile.GetLoginStorage();

        this.props.ActionGetAllEmpresaByEmail(email);
    }

    SetOnChangeValidateCNPJ = (e) => {
        if (validator.isEmpty(e)) {
            this.setState({
                IsInvalidCNPJ: true,
                ValorCNPJStatus: true,
                ValorCNPJ: e,
                FirstClick: false
            })
        }
        else if (!ValidarCNPJ._cnpj(e)) {
            this.setState({
                IsInvalidCNPJ: true,
                ValorCNPJStatus: true,
                ValorCNPJ: e,
                FirstClick: false
            })
        }
        else {
            this.props.GetByCNPJ(e);
            this.setState({
                ValorCNPJ: e,
                IsInvalidCNPJ: false,
                ValorCNPJStatus: true,
                FirstClick: false
            })
        }
    }

    SetOnChangeValidateRazaoSocial = (e) => {
        if (validator.isEmpty(e)) {
            this.setState({
                IsInvalidRazaoSocial: true,
                ValorRazaoSocial: e,
                FirstClick: false
            })
        }
        else {
            this.setState({
                ValorRazaoSocial: e,
                IsInvalidRazaoSocial: false,
                FirstClick: false
            })
        }
    }

    SetOnChangeValidateNomeFantasia = (e) => {
        if (validator.isEmpty(e)) {
            this.setState({
                IsInvalidNomeFantasia: true,
                ValorNomeFantasia: e,
                FirstClick: false
            })
        }
        else {
            this.setState({
                ValorNomeFantasia: e,
                IsInvalidNomeFantasia: false,
                FirstClick: false
            })
        }
    }

    SetCadastrarEmpresa() {

        const { EmpresaGetByCNPJ } = this.props

        if (this.state.FirstClick) {
            this.setState({
                IsInvalidCNPJ: true,
                IsInvalidRazaoSocial: true,
                IsInvalidNomeFantasia: true
            })
        }
        else {

            var empresaDTO = new EmpresaDTO(this.state.ValorCNPJ, this.state.ValorRazaoSocial, this.state.ValorNomeFantasia);
            this.props.ActionCadastrarEmpresa(empresaDTO);

            var userProfile = new UserProfile();
            let email = userProfile.GetLoginStorage();
            this.props.ActionGetAllEmpresaByEmail(email);

        }
    }

    SetTentarNovamente() {
        this.props.ActionTentarNovamente()
    }

    render() {

        const { EmpresaGetByCNPJ, CadastroEmpresa, CadastroEmpresaErro, Load } = this.props

        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro Nova Empresa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        {CadastroEmpresa === false && CadastroEmpresaErro == false &&
                            <form className="needs-validation" novalidate>
                                <div className="form-group">
                                    <label >CNPJ</label>
                                    <input type="text" className={"form-control " + (this.state.IsInvalidCNPJ == true ? "is-invalid" : (this.state.ValorCNPJ.length === 14 && EmpresaGetByCNPJ === '' && this.state.IsInvalidCNPJ == false) ? 'is-valid' : (this.state.ValorCNPJStatus === true ? "is-invalid" : ""))} id="formGroupExampleInput" onChange={v => this.SetOnChangeValidateCNPJ(v.target.value)} />
                                    <div hidden={this.state.IsInvalidCNPJ == true ? false : true} className="invalid-feedback">
                                        CNPJ Invalido
                                 </div>
                                    <div hidden={this.state.ValorCNPJ.length === 14 && this.state.IsInvalidCNPJ == false && EmpresaGetByCNPJ !== '' ? false : true} className="invalid-feedback">
                                        CNPJ Existente
                                 </div>
                                </div>
                                <div className="form-group">
                                    <label >Razão Social</label>
                                    <input type="text" className={"form-control " + (this.state.IsInvalidRazaoSocial === false && this.state.ValorRazaoSocial.length === 0 ? '' : (this.state.ValorRazaoSocial.length !== 0 && this.state.IsInvalidRazaoSocial === false ? 'is-valid' : 'is-invalid'))} id="formGroupExampleInput2" onChange={v => this.SetOnChangeValidateRazaoSocial(v.target.value)} />
                                    <div hidden={this.state.IsInvalidRazaoSocial === false ? true : false} className="invalid-feedback">
                                        Razao Social Não pode está vazio.
                                 </div>
                                </div>
                                <div className="form-group">
                                    <label>Nome Fantasia</label>
                                    <input type="text" className={"form-control " + (this.state.IsInvalidNomeFantasia === false && this.state.ValorNomeFantasia.length === 0 ? '' : (this.state.ValorNomeFantasia.length !== 0 && this.state.IsInvalidNomeFantasia === false ? 'is-valid' : 'is-invalid'))} id="formGroupExampleInput2" onChange={v => this.SetOnChangeValidateNomeFantasia(v.target.value)} />
                                    <div hidden={this.state.IsInvalidNomeFantasia === false ? true : false} className="invalid-feedback">
                                        Nome Fantasia Não pode estar vazio.
                                 </div>
                                </div>
                            </form>
                        }

                        {CadastroEmpresa === true && CadastroEmpresaErro == false &&
                            <div className="alert alert-success" role="alert">
                                <h4 className="alert-heading">Sucesso!</h4>
                                <p>Cadastro de empresa realizado com sucesso.</p>
                                <hr />
                            </div>
                        }

                        {CadastroEmpresa === false && CadastroEmpresaErro == true &&
                            <div className="alert alert-danger" role="alert">
                                <h4 className="alert-heading">Erro!</h4>
                                <p>Cadastro de empresa com erro.</p>
                                <hr />
                            </div>
                        }

                        {Load &&
                            <div>
                                <div className="loader">Loading...</div>
                            </div>
                        }

                    </Modal.Body>
                    <Modal.Footer>

                        {CadastroEmpresa === false && CadastroEmpresaErro == false &&
                            <div>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Sair
                            </Button>
                                <Button variant="primary" onClick={this.SetCadastrarEmpresa}>
                                    Salvar
                            </Button>
                            </div>
                        }

                        {CadastroEmpresa === false && CadastroEmpresaErro == true &&

                            <Button variant="primary" onClick={this.SetTentarNovamente}>
                                Tentar Novamente
                            </Button>
                        }

                    </Modal.Footer>
                </Modal>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand">Gerenciamento de Empresa</a>
                    <form className="form-inline">
                        <Button variant="primary" onClick={this.handleShow}>
                            Novo
                        </Button>                      
                    </form>
                </nav>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        EmpresaGetByCNPJ: state.EmpresaState.EmpresaGetByCNPJ,
        CadastroEmpresa: state.EmpresaState.CadastroEmpresa,
        CadastroEmpresaErro: state.EmpresaState.CadastroEmpresaErro,
        Load: state.EmpresaState.Load
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaBusca);

