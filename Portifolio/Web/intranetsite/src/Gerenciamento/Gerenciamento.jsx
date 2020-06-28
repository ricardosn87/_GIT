import { Component } from "react";
import * as React from 'react';
import Empresa from './Empresa/Empresa'
import PaginaHeader from '../PaginaHeader/PaginaHeader'
import {Funcionario} from './Funcionario/Funcionario'
import { Marca } from "./Marca/Marca";


class Gerenciamento extends Component {

    constructor(props) {
        super(props);
        this.state = {

            TabAtivoHome: null,
            TabAtivoEmpresa: null,
            TabAtivoFuncionario: null,
            TabAtivoMarca: null,


            ConteudoTabAtivoHome: null,
            ConteudoTabAtivoEmpresa: null,
            ConteudoTabAtivoFuncionario: null,
            ConteudoAtivoMarca: null,

            DidMount: false
        }

        this.SetOnChangeTabMenuActive = this.SetOnChangeTabMenuActive.bind(this);
    }

    componentDidMount() {
        this.setState({
            TabAtivoHome: 'active'
        })
    }

    SetTabActiveDefault() {

        this.setState({
            TabAtivoHome: null,
            TabAtivoEmpresa: null,
            TabAtivoFuncionario: null,
            TabAtivoMarca: null,

            ConteudoTabAtivoHome: null,
            ConteudoTabAtivoEmpresa: null,
            ConteudoTabAtivoFuncionario: null,
            ConteudoAtivoMarca: null
        })
    }


    SetOnChangeTabMenuActive = (e) => {

        this.SetTabActiveDefault()

        switch (e) {
            case 0:
                this.setState({
                    TabAtivoHome: 'active',
                    ConteudoTabAtivoHome: 'show active'
                })
                break;
            case 1:
                this.setState({
                    TabAtivoEmpresa: 'active',
                    ConteudoTabAtivoEmpresa: 'show active'
                })
                break;
            case 2:
                this.setState({
                    TabAtivoFuncionario: 'active',
                    ConteudoTabAtivoFuncionario: 'show active'
                })
                break;
            case 3:
                this.setState({
                    TabAtivoMarca: 'active',
                    ConteudoAtivoMarca: 'show active'
                })
                break;
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <PaginaHeader></PaginaHeader>
                </div>
                <div>
                    <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a defaultValue={null} onClick={valor => this.SetOnChangeTabMenuActive(0)} className={"nav-link " + this.state.TabAtivoHome} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Home</a>
                        </li>
                        <li className="nav-item">
                            <a defaultValue={null} onClick={valor => this.SetOnChangeTabMenuActive(1)} className={"nav-link " + this.state.TabAtivoEmpresa} id="pills-company-tab" data-toggle="pill" href="#pills-company" role="tab" aria-controls="pills-company" aria-selected="false">Empresa</a>
                        </li>
                        <li className="nav-item">
                            <a defaultValue={null} onClick={valor => this.SetOnChangeTabMenuActive(2)} className={"nav-link " + this.state.TabAtivoFuncionario} id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Funcionarios</a>
                        </li>
                        <li className="nav-item">
                            <a defaultValue={null} onClick={valor => this.SetOnChangeTabMenuActive(3)} className={"nav-link " + this.state.TabAtivoMarca} id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Marca</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className={"tab-pane fade " + this.state.ConteudoTabAtivoHome} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <nav className="navbar navbar-light bg-light justify-content-between">
                                <a className="navbar-brand">Home</a>
                                <form className="form-inline">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </nav>

                        </div>
                        <div className={"tab-pane fade " + this.state.ConteudoTabAtivoEmpresa} id="pills-company" role="tabpanel" aria-labelledby="pills-company-tab">
                            <Empresa></Empresa>
                        </div>
                        <div className={"tab-pane fade " + this.state.ConteudoTabAtivoFuncionario} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                           <Funcionario></Funcionario>
                        </div>
                        <div className={"tab-pane fade " + this.state.ConteudoAtivoMarca} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                              <Marca></Marca>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gerenciamento