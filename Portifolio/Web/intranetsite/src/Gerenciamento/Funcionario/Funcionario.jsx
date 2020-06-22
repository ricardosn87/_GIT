import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import validator from 'validator'
import { FuncionarioCadastro } from './FuncionarioCadastro/FuncionarioCadastro'
import { FuncionarioTabelaListaControl } from './FuncionarioTabelaLista/FuncionarioTabelaListaControl'

export const Funcionario = () => {
  return (
    <div>
      <FuncionarioCadastro></FuncionarioCadastro>
      <FuncionarioTabelaListaControl></FuncionarioTabelaListaControl>
    </div>
  )
}
