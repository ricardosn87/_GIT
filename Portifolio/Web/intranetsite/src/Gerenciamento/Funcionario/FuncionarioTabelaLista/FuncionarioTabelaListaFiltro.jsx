import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch } from 'react-redux'
import { ValidarCpf } from './../../../Util/Validacao/ValidarCpf';
import moment from 'moment'



export const FuncionarioTabelaListaFiltro = ({ DataToFilterEmployees, DataToFilterEmployeesEmail, DataToFilterEmployeesCompany }) => {

  const dispatch = useDispatch()

  const [selected, setSelected] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState([]);
  const [selectedCPF, setSelectedCPF] = useState([]);
  const [selectedCPFErro, setSelectedCPFErro] = useState(0);
  const [selectedDataInit, setSelectedDataInit] = useState('');
  const [selectedDataEnd, setSelectedDataEnd] = useState('');

  var DataInicioCadastro = ''
  var DataFinalCadastro = '';

  if (selectedDataInit === '') {
    DataInicioCadastro = moment().subtract(1, 'years').format('YYYY-MM-DD');
    dispatch({
      type: 'FILTER_EMPLOYEE_DATAINIT_CHOOSE',
      EmployeeDataInitChoose: DataInicioCadastro
    })
  }

  if (selectedDataEnd === '') {
    DataFinalCadastro = moment().format('YYYY-MM-DD');
    dispatch({
      type: 'FILTER_EMPLOYEE_DATAEND_CHOOSE',
      EmployeeDataEndChoose: DataFinalCadastro
    })
  }


  var optionsName = DataToFilterEmployees
  var optionEmail = DataToFilterEmployeesEmail
  var optionsCompany = DataToFilterEmployeesCompany

  function ChangeDateInitChoose(dispatch, e) {
    setSelectedDataInit(e)
    dispatch({
      type: 'FILTER_EMPLOYEE_DATAINIT_CHOOSE',
      EmployeeDataInitChoose: e
    })
  }

  function ChangeDateEndChoose(dispatch, e) {
    setSelectedDataEnd(e)
    dispatch({
      type: 'FILTER_EMPLOYEE_DATAEND_CHOOSE',
      EmployeeDataEndChoose: e
    })
  }

  function ChooseEmployeeName(dispatch, e) {

    if (e.length > 0) {
      dispatch({
        type: 'FILTER_EMPLOYEE_CHOOSE',
        EmployeeChoose: e
      })
    }
    else {
      dispatch({
        type: 'FILTER_EMPLOYEE_CHOOSE',
        EmployeeChoose: null
      })
    }
  }

  function ChooseEmployeeEmail(dispatch, e) {
    if (e.length > 0) {
      dispatch({
        type: 'FILTER_EMPLOYEE_EMAIL_CHOOSE',
        EmployeeEmailChoose: e
      })
    }
    else {
      dispatch({
        type: 'FILTER_EMPLOYEE_EMAIL_CHOOSE',
        EmployeeEmailChoose: null
      })
    }
  }

  function ChooseEmployeeCPF(dispatch, e) {
    setSelectedCPF(e)
    if (e.length > 0) {

      if (ValidarCpf.cpf(e) === false) {
        setSelectedCPFErro(400)
        dispatch({
          type: 'FILTER_EMPLOYEE_CPF_CHOOSE',
          EmployeeCPFChoose: e
        })
      }
      else {
        setSelectedCPFErro(404)
        dispatch({
          type: 'FILTER_EMPLOYEE_CPF_CHOOSE',
          EmployeeCPFChoose: e
        })
      }
    }
    else {
      setSelectedCPFErro(0)
      dispatch({
        type: 'FILTER_EMPLOYEE_CPF_CHOOSE',
        EmployeeCPFChoose: null
      })
    }
  }

  function ReturnStatusCPF(status) {
    switch (status) {
      case 0:
        return null
      case 404:
        return 'valid'
      default:
        return 'invalid'
    }
  }

  function ChangeEmployChoose(dispatch, e) {
    if (e === "Selecione:") {
      dispatch({
        type: 'FILTER_EMPLOYEE_COMPANY_CHOOSE',
        EmployeeCompanyChoose: null
      })
    }
    else {
      dispatch({
        type: 'FILTER_EMPLOYEE_COMPANY_CHOOSE',
        EmployeeCompanyChoose: e
      })
    }
  }


  useEffect(() => {

  })

  return (
    <div style={{ marginBottom: 25 }}>
      <form className='needs-validation'>
        <span className="h3 margin-top-0 text-regular green-dark-text hidden-xs">Refinar busca</span>
        <div className="form-group">
          <label >Nome</label>
          <Typeahead
            id="basic-typeahead-example"
            labelKey="Nome"
            multiple={false}
            onChange={setSelected}
            options={optionsName}
            placeholder="Escolha um nome..."
            selected={ChooseEmployeeName(dispatch, selected)}
          />
        </div>
        <div className="form-group">
          <label >Email</label>
          <Typeahead
            id="basic-typeahead-example"
            labelKey="Email"
            multiple={false}
            onChange={setSelectedEmail}
            options={optionEmail}
            placeholder="Escolha um email..."
            selected={ChooseEmployeeEmail(dispatch, selectedEmail)}
          />
        </div>
        <div className="form-group">
          <label>CPF</label>
          <input
            onChange={e => ChooseEmployeeCPF(dispatch, e.target.value)}
            value={selectedCPF}
            type='CPF'
            className={
              'form-control is-' +
              ReturnStatusCPF(selectedCPFErro)
            }
            placeholder='Insira um CPF válido.'
            required
          />

          <div className='form-group'>
            <label>Empresa:</label>
            <select
              className='form-control'
              onChange={e => ChangeEmployChoose(dispatch, e.target.value)}
            >
              <option value={undefined}>Selecione:</option>
              {optionsCompany}

            </select>
          </div>
          <div className='form-group'>
            <div className="container">
              <div className="row">
                <div className="col">
                  Data Início Cadastro:<input onChange={e => ChangeDateInitChoose(dispatch, e.target.value)}
                    className="form-control" type="date"
                    value={selectedDataInit === '' ? DataInicioCadastro : selectedDataInit} id="example-date-input" />
                </div>
                <div className="col">
                  Data Final Cadastro:  <input onChange={e => ChangeDateEndChoose(dispatch, e.target.value)}
                    className="form-control" type="date"
                    value={selectedDataEnd === '' ? DataFinalCadastro : selectedDataEnd} id="example-date-input" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
