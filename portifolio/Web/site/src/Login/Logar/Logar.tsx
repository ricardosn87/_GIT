import * as React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { CadastrarUsuario } from './LogarAction'


export interface LogarProps {

}

class Logar extends React.Component<LogarProps, any> {
  constructor(props: LogarProps) {
    super(props);
  }
  render() {

    return (
      <div style={{ width: 800, margin: 50, paddingLeft: 500 }} >
        <div className="container">
          <div className="form-group row">
            <div className="col align-self-center">
              <input className="form-control" type="text" placeholder="Email" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col align-self-center">
              <input className="form-control" type="text" placeholder="Senha" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col align-self-center">
              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => CadastrarUsuario()} >Entrar</button>
            </div>
          </div>
          <div className="form-group row">
            <div className="col align-self-center">
              Novo no sistema? <Link to="/Cadastro">Cadastra-se</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  UsuarioExiste: state.LogarState.UsuarioExiste
})
const mapDispatchToProps = dispatch => bindActionCreators({ CadastrarUsuario }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Logar)
