import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import { useSelector } from 'react-redux'
import validator from 'validator'
import { useDispatch } from 'react-redux'

import * as Actions from '../FuncionarioActions'
import { SaveFuncionarioDTO } from './../Model/SaveFuncionarioDTO'
import { ValidarEmail } from './../../../Util/Validacao/ValidarEmail'
import { ValidarCpf } from './../../../Util/Validacao/ValidarCpf'

export const FuncionarioCadastro = () => {
  const dispatch = useDispatch()

  //const textoSalvar = "Salvar"

  // Declare uma nova variável de state, a qual chamaremos de "count"
  const [show, SetShowModal] = useState(false)
  const [valorEmail, SetValorEmail] = useState('')
  const [valorNome, SetValorNome] = useState('')
  const [valorCPF, SetValorCPF] = useState('')
  const [valorSenha, SetValorSenha] = useState('')
  const [valorEmploy, SetValorEmploy] = useState(0)

  const [erroAPI, SetValorErroAPI] = useState('')
  const [FirtsClick, SetFirtsClick] = useState(false)
  const [FirtsClickSenha, SetFirtsClickSenha] = useState(false)

  const EmailExisteStatus = useSelector(
    State => State.FuncionarioState.EmailExisteStatus
  )
  const CPFExisteStatus = useSelector(
    State => State.FuncionarioState.CPFExisteStatus
  )
  const ListaEmpresa = useSelector(state => state.EmpresaState.ListaEmpresa)
  const SaveFuncionarioState = useSelector(
    state => state.FuncionarioState.SaveFuncionario
  )

  function handleShow () {
    SetShowModal(true)
  }

  function handlerClose () {
    if (show) {
      SetValorEmail('')
      SetValorNome('')
      SetValorCPF('')
      SetValorSenha('')
      SetValorEmploy(0)
      SetFirtsClick(false)
      SetFirtsClickSenha(false)
      SetShowModal(false)

      dispatch({
        type: 'GET_CPF_EXIST',
        CPFExisteStatus: 0
      })

      dispatch({
        type: 'GET_EMAIL_EXIST',
        EmailExisteStatus: 0
      })

      dispatch({
        type: 'SAVE_FUNCIONARIO',
        SaveFuncionario: null
      })
    }
  }

  const ChangeEmployChoose = employ => {
    if (employ !== 'Selecione:') {
      var employInteiro = parseInt(employ)
      SetValorEmploy(employInteiro)
    } else {
      SetValorEmploy(0)
    }
  }

  const ReturnPopulateDropSelectEmploy = data => {
    var listOptionsEmploy = []

    if (data !== undefined) {
      data.map((key, index) => {
        var option = (
          <option value={key.idEmpresa}>
            CNPJ: {key.cnpj} - Razão Social:{key.razaoSocial}
          </option>
        )
        listOptionsEmploy.push(option)
      })
    }

    return listOptionsEmploy
  }

  const ChangeValorEmail = email => {
    SetValorEmail(email)
    if (ValidarEmail.ValidateEmail(email) === false) {
      dispatch({ type: 'GET_EMAIL_EXIST', EmailExisteStatus: 400 })
    } else {
      Actions.GetFuncionarioByEmail(dispatch, email)
    }
  }

  function ReturnStatusEmail (status) {
    switch (status) {
      case 0:
        return null
      case 404:
        return 'valid'
      default:
        return 'invalid'
    }
  }

  function ReturnStatusEmailDescription (status) {
    switch (status) {
      case 400:
        return 'Email Inválido.'
      case 200:
        return 'Email Existente, favor escolher outro.'
      default:
        return null
    }
  }

  const ChangeValorNome = nome => {
    SetValorNome(nome)
    SetFirtsClick(true)
  }

  function ReturnStatusNomeDescription (nome) {
    if (nome !== '') {
      return null
    } else return 'Nome Inválido'
  }

  function ReturnStatusShowDescription (nome) {
    if (nome === '' && FirtsClick === false) {
      return null
    } else if (nome === '' && FirtsClick === true) {
      return 'invalid'
    } else if (nome !== '') return 'valid'
  }

  function ReturnStatusHiddenDescription (nome) {
    if (nome === '' && FirtsClick === false) {
      return true
    } else if (nome === '' && FirtsClick === true) {
      return false
    } else return true
  }

  const ChangeValorCPF = cpf => {
    SetValorCPF(cpf)
    if (ValidarCpf.cpf(cpf) === false) {
      dispatch({ type: 'GET_CPF_EXIST', CPFExisteStatus: 400 })
    } else {
      Actions.GetFuncionarioByCPF(dispatch, cpf)
    }

    //SetFirtsClick(true);
  }

  function ReturnStatusCPF (status) {
    switch (status) {
      case 0:
        return null
      case 404:
        return 'valid'
      default:
        return 'invalid'
    }
  }

  function ReturnStatusCPFDescription (status) {
    switch (status) {
      case 400:
        return 'CPF Inválido.'
      case 200:
        return 'CPF Existente, favor escolher outro.'
      default:
        return null
    }
  }

  const ChangeValorSenha = senha => {
    SetValorSenha(senha)
    SetFirtsClickSenha(true)
  }

  function ReturnStatusSenhaShowDescription (senha) {
    if (senha === '' && FirtsClickSenha === false) {
      return null
    } else if (senha === '' && FirtsClickSenha === true) {
      return 'invalid'
    } else if (senha !== '') return 'valid'
  }

  function ReturnStatusHiddenDescriptionSenha (senha) {
    if (senha === '' && FirtsClickSenha === false) {
      return true
    } else if (senha === '' && FirtsClickSenha === true) {
      return false
    } else return true
  }

  function ReturnStatusSenhaDescription (Senha) {
    if (Senha !== '') {
      return null
    } else return 'Senha Inválido'
  }

  function SaveFuncionario () {
    var saveFuncionarioDTO = new SaveFuncionarioDTO(
      valorCPF,
      valorSenha,
      valorEmail,
      valorNome,
      valorEmploy
    )
    Actions.ActionSaveFuncionario(dispatch, saveFuncionarioDTO)
  }

  function EnableButtonSaveFuncionario () {
    if (
      valorEmail === '' ||
      valorNome === '' ||
      valorCPF === '' ||
      valorSenha === '' ||
      valorEmploy === 0
    ){
         return <Button variant='primary' onClick={SaveFuncionario} disabled>Salvar</Button>
    }
     
    else {
        return <Button variant='primary' onClick={SaveFuncionario}>Salvar</Button>
        }
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-light justify-content-between'>
        <a className='navbar-brand'>Gerenciamento de Funcionario</a>
        <form className='form-inline'>
          <Button variant='primary' onClick={handleShow}>
            Novo
          </Button>
        </form>
      </nav>

      <div>
        <Modal show={show} onHide={handlerClose}>
          <Modal.Header closeButton>
            <Modal.Title>Novo Funcionário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              {SaveFuncionarioState === null && (
                <form className='needs-validation'>
                  <div className='form-group'>
                    <label>Email</label>
                    <input
                      onChange={e => ChangeValorEmail(e.target.value)}
                      value={valorEmail}
                      type='email'
                      className={
                        'form-control is-' +
                        ReturnStatusEmail(EmailExisteStatus)
                      }
                      placeholder='Enter email'
                      required
                    />
                    <div
                      hidden={EmailExisteStatus == 0 ? true : false}
                      className={
                        ReturnStatusEmail(EmailExisteStatus) + '-feedback'
                      }
                    >
                      {ReturnStatusEmailDescription(EmailExisteStatus)}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Nome</label>
                    <input
                      onChange={e => ChangeValorNome(e.target.value)}
                      value={valorNome}
                      type='text'
                      className={
                        'form-control is-' +
                        ReturnStatusShowDescription(valorNome)
                      }
                      placeholder='Nome'
                      required
                    />
                    <div
                      hidden={ReturnStatusHiddenDescription(valorNome)}
                      className={
                        ReturnStatusShowDescription(valorNome) + '-feedback'
                      }
                    >
                      {ReturnStatusNomeDescription(valorNome)}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>CPF</label>
                    <input
                      onChange={e => ChangeValorCPF(e.target.value)}
                      value={valorCPF}
                      className={
                        'form-control is-' + ReturnStatusCPF(CPFExisteStatus)
                      }
                      type='text'
                      placeholder='CPF'
                      required
                    />
                    <div
                      hidden={CPFExisteStatus == 0 ? true : false}
                      className={ReturnStatusCPF(CPFExisteStatus) + '-feedback'}
                    >
                      {ReturnStatusCPFDescription(CPFExisteStatus)}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Senha</label>
                    <input
                      onChange={e => ChangeValorSenha(e.target.value)}
                      value={valorSenha}
                      className={
                        'form-control is-' +
                        ReturnStatusSenhaShowDescription(valorSenha)
                      }
                      type='password'
                      placeholder='Senha'
                      required
                    />
                    <div
                      hidden={ReturnStatusHiddenDescriptionSenha(valorSenha)}
                      className={
                        ReturnStatusSenhaShowDescription(valorSenha) +
                        '-feedback'
                      }
                    >
                      {ReturnStatusSenhaDescription(valorSenha)}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Empresa:</label>
                    <select
                      className='form-control'
                      onChange={e => ChangeEmployChoose(e.target.value)}
                    >
                      <option value={undefined}>Selecione:</option>
                      {ReturnPopulateDropSelectEmploy(ListaEmpresa)}
                    </select>
                  </div>
                </form>
              )}
              {SaveFuncionarioState === 201 && (
                <div className='alert alert-success' role='alert'>
                  <h4 className='alert-heading'>Sucesso!</h4>
                  <p>Cadastro de funcionario realizado com sucesso.</p>
                  <hr />
                </div>
              )}
              {SaveFuncionarioState !== 201 && SaveFuncionarioState !== null && (
                <div className='alert alert-danger' role='alert'>
                  <h4 className='alert-heading'>Erro!</h4>
                  <p>Erro inesperado.</p>
                  <hr />
                </div>
              )}
            </>
          </Modal.Body>
          {SaveFuncionarioState === null && (
            <Modal.Footer>
              <Button variant='secondary' onClick={handlerClose}>
                Fechar
              </Button>           
              {EnableButtonSaveFuncionario()}
            </Modal.Footer>
          )}
        </Modal>
      </div>
    </div>
  )
}
