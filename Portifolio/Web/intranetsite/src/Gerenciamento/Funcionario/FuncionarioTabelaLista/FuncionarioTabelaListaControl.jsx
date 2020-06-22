import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux'
import React, { useState } from 'react';

import { FuncionarioTabelaListaFiltro } from './FuncionarioTabelaListaFiltro';
import { FuncionarioTabelaLista } from './FuncionarioTabelaLista';

import * as Actions from '../FuncionarioActions'
import { UserProfile } from './../../../Usuario/UserProfile/UserProfile';
import { FilterGetAllEmployeesRequestDTO } from './../Model/FilterGetAllEmployeesRequestDTO';
import { useSelector } from 'react-redux'
import { OptionsEmployeesDTO } from './../Model/OptionsEmployeesDTO';
import { OptionsEmployeesEmailDTO } from './../Model/OptionsEmployeesEmailDTO';
import { OptionsEmployeesCompanyDTO } from './../Model/OptionsEmployeesCompanyDTO';

function LoadDataInit(dispatch, filterGetAllEmployeesRequestDTO) {
  Actions.FilterGetAllEmployees(dispatch, filterGetAllEmployeesRequestDTO);
}

function LoadDataToFilterEmployees(data) {
  var listOptionsEmploy = []
  if (data !== undefined) {
    data.map((key, index) => {

      key.funcionarioDTOs.map((k, i) => {
        var optionsEmployeesDTO = new OptionsEmployeesDTO(k.cpf, k.nome)
        listOptionsEmploy.push(optionsEmployeesDTO)
      })
    })
  }
  return listOptionsEmploy;
}

function LoadDataToFilterEmployeesEmail(data) {
  var listOptionsEmploy = []
  if (data !== undefined) {
    data.map((key, index) => {

      key.funcionarioDTOs.map((k, i) => {
        var optionsEmployeesDTO = new OptionsEmployeesEmailDTO(k.cpf, k.email)
        listOptionsEmploy.push(optionsEmployeesDTO)
      })
    })
  }
  return listOptionsEmploy;
}

function LoadDataToFilterEmployeesCompany(data) {
  var listOptionsEmploy = []
  var listOptionsEmployControl = []

  if (data !== undefined) {
    data.map((key, index) => {

      var option = (
        <option value={key.idEmpresa}>
          CNPJ: {key.cnpj} - Razão Social:{key.razaosocial}
        </option>
      )
      var contains = null

      //contains = listOptionsEmployControl[key.cnpj];
      contains = listOptionsEmployControl.filter(function (number) {
        return number === key.cnpj;
      });
      if (contains.length === 0) {
        listOptionsEmploy.push(option)
        listOptionsEmployControl.push(key.cnpj)
      }
    })
  }

  return listOptionsEmploy
}

export const FuncionarioTabelaListaControl = () => {
  const dispatch = useDispatch()

  var ListaFuncionariosArray = []
  const ListaFuncionarios = useSelector(
    State => State.FuncionarioState.ListFilterGetAllEmployees
  )
  
  ListaFuncionariosArray = ListaFuncionarios

  const EmployeeEmailChoose = useSelector(
    State => State.FuncionarioState.EmployeeEmailChoose
  )

  const EmployeeChoose = useSelector(
    State => State.FuncionarioState.EmployeeChoose
  )

  const EmployeeCPFChoose = useSelector(
    State => State.FuncionarioState.EmployeeCPFChoose
  )

  const EmployeeCompanyChoose = useSelector(
    State => State.FuncionarioState.EmployeeCompanyChoose
  )

  const EmployeeDataInitChoose = useSelector(
    State => State.FuncionarioState.EmployeeDataInitChoose
  )

  const EmployeeDataEndChoose = useSelector(
    State => State.FuncionarioState.EmployeeDataEndChoose
  )

  if (EmployeeChoose !== null && ListaFuncionarios.length !== 0) {
    var ListaFuncionariosArrayFilter = []
    ListaFuncionariosArray.map((key, index) => {
      var funExist = null;
      funExist = key.funcionarioDTOs.filter(x => x.cpf === EmployeeChoose[0].CPF);
      if (funExist !== null && funExist.length !== 0) {
        ListaFuncionariosArrayFilter.push(key)
      }
    })
    ListaFuncionariosArray = ListaFuncionariosArrayFilter
  }

  if (EmployeeEmailChoose !== null && ListaFuncionarios.length !== 0) {
    var ListaFuncionariosArrayFilter = []
    ListaFuncionariosArray.map((key, index) => {
      var funExist = null;
      funExist = key.funcionarioDTOs.filter(x => x.email === EmployeeEmailChoose[0].Email);
      if (funExist.length !== 0) {
        ListaFuncionariosArrayFilter.push(key)
      }
    })
    ListaFuncionariosArray = ListaFuncionariosArrayFilter
  }

  if (EmployeeCPFChoose !== null && ListaFuncionarios.length !== 0) {
    var ListaFuncionariosArrayFilter = []
    ListaFuncionariosArray.map((key, index) => {
      var funExist = null;
      funExist = key.funcionarioDTOs.filter(x => x.cpf === EmployeeCPFChoose);
      if (funExist.length !== 0) {
        ListaFuncionariosArrayFilter.push(key)
      }
    })
    ListaFuncionariosArray = ListaFuncionariosArrayFilter
  }

  if (EmployeeCompanyChoose !== null && ListaFuncionarios.length !== 0) {
    var ListaFuncionariosArrayFilter = []
    ListaFuncionariosArrayFilter = ListaFuncionariosArray.filter(x => x.idEmpresa === parseInt(EmployeeCompanyChoose))
    ListaFuncionariosArray = ListaFuncionariosArrayFilter
  }

  if (ListaFuncionariosArray.length > 0) {
    var ListaFuncionariosArrayFilter = []
    ListaFuncionariosArray.map((key, index) => {
      var funExist = null;
      funExist = key.funcionarioDTOs.filter(x => x.dataCadastro >= EmployeeDataInitChoose && x.dataCadastro <= EmployeeDataEndChoose);
      if (funExist.length !== 0) {
        ListaFuncionariosArrayFilter.push(key)
      }
    })
    ListaFuncionariosArray = ListaFuncionariosArrayFilter
  }

  var userProfile = new UserProfile();
  let email = userProfile.GetLoginStorage();


  var filterGetAllEmployeesRequestDTO = new FilterGetAllEmployeesRequestDTO(
    email, null, null, null, null, null, null, null, null, null, null, null);

  if (ListaFuncionarios.length === 0) {
    LoadDataInit(dispatch, filterGetAllEmployeesRequestDTO);
  }
  var DataToFilterEmployees = []
  if (ListaFuncionarios.length !== 0) {
    DataToFilterEmployees = LoadDataToFilterEmployees(ListaFuncionarios)
  }
  var DataToFilterEmployeesEmail = []
  if (ListaFuncionarios.length !== 0) {
    DataToFilterEmployeesEmail = LoadDataToFilterEmployeesEmail(ListaFuncionarios)
  }

  var DataToFilterEmployeesCompany = []
  if (ListaFuncionarios.length !== 0) {
    DataToFilterEmployeesCompany = LoadDataToFilterEmployeesCompany(ListaFuncionarios)
  }

  return (
    <div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-3">
            <h3>Total Encontrados: {ListaFuncionariosArray !== undefined ? ListaFuncionariosArray.length : 0} </h3>

          </div>
          <div className="col col-lg-9">

          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div style={{ backgroundColor: "#BFC9CA" }} className="col col-lg-3">
            <FuncionarioTabelaListaFiltro
              DataToFilterEmployees={DataToFilterEmployees}
              DataToFilterEmployeesEmail={DataToFilterEmployeesEmail}
              DataToFilterEmployeesCompany={DataToFilterEmployeesCompany}
            >
            </FuncionarioTabelaListaFiltro>
          </div>
          <div className="col col-lg-9">
            <FuncionarioTabelaLista ListaFuncionariosArray={ListaFuncionariosArray}>

            </FuncionarioTabelaLista>
          </div>
        </div>
      </div>
    </div>
  )
}
