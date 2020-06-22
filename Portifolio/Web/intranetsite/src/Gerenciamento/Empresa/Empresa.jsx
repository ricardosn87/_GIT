import { Component } from 'react';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmpresaLista from './EmpresaLista/EmpresaLista'
import EmpresaBusca from './EmpresaBusca/EmpresaBusca'

class Empresa extends Component {
    render() {
        return (
            <div>
                <EmpresaBusca></EmpresaBusca>
                <EmpresaLista></EmpresaLista>
            </div>

        )
    }
}
export default Empresa;