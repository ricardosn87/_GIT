import { Component } from 'react';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as Actions from '../EmpresaActions'
import { UserProfile } from '../../../Usuario/UserProfile/UserProfile'
import { EmpresaTableListDTO } from '../Model/EmpresaTableListDTO';
import TablePagination from '../../../Controls/TablePagination/TablePagination';


class EmpresaLista extends Component {

   
    SetInitialPage() {
        var userProfile = new UserProfile();
        let email = userProfile.GetLoginStorage();

        this.props.ActionGetAllEmpresaByEmail(email);
    }

    componentDidMount() {

        this.SetInitialPage()
    }
  

    render() {

        const { ListaEmpresa, Load } = this.props      

        return (
            <div>
                <TablePagination ListaEmpresa={ListaEmpresa}></TablePagination>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ListaEmpresa: state.EmpresaState.ListaEmpresa,
        Load: state.EmpresaState.Load
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaLista);
