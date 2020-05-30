import { Component } from 'react';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';
import {login} from '../Usuario/Login/Login'


class PaginaHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sair: false
        };

        this.SetSair = this.SetSair.bind(this)
    }

    SetSair() {
        localStorage.removeItem('login');
        this.setState({
            sair: true
        })

    }


    render() {

        if (this.state.sair) {
            return (<Redirect to="/Login" />)
        }

        let userLogado = localStorage.getItem('login');

        return (
            <div>
                <h1>Bem Vindo {userLogado}</h1>
                <div>
                    <button onClick={this.SetSair} type="button" className="btn btn-primary">Sair</button>
                </div>
            </div>
        )
    }
}
export default PaginaHeader;