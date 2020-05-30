
import * as React from 'react';
import TableData from './TableData';
import Pagination from './Pagination';
import { useSelector } from 'react-redux'
import { EmpresaTableListDTO } from './../../Gerenciamento/Empresa/Model/EmpresaTableListDTO';
import { useDispatch } from 'react-redux'
import { useEffect } from "react";


function TablePagination(props) {

    const dispatch = useDispatch();
    let DataEmpresaArray = []

    var EmpresaDataFilter = useSelector(State => State.reducersPagination.ListaEmpresaFilter)
    const FilterTable = useSelector(State => State.reducersPagination.FilterTable)

    const RenderDataFilterTable = () => {
        let DataEmpresaArrayClearWithFilter = []
        DataEmpresaArrayClearWithFilter = props.ListaEmpresa;
        if (FilterTable.ValorCNPJ !== "" && FilterTable.ValorCNPJ !== null && FilterTable.ValorCNPJ !== undefined) {
            DataEmpresaArrayClearWithFilter = DataEmpresaArrayClearWithFilter.filter(x => x.cnpj === FilterTable.ValorCNPJ);
            EmpresaDataFilter = 1
        }

        if (FilterTable.ValorRazaoSocial !== "" && FilterTable.ValorRazaoSocial !== null && FilterTable.ValorRazaoSocial !== undefined) {
            DataEmpresaArrayClearWithFilter = DataEmpresaArrayClearWithFilter.filter(x => x.razaoSocial === FilterTable.ValorRazaoSocial);
            EmpresaDataFilter = 1
        }

        if (FilterTable.ValorNomeFantasia !== "" && FilterTable.ValorNomeFantasia !== null && FilterTable.ValorNomeFantasia !== undefined) {
            DataEmpresaArrayClearWithFilter = DataEmpresaArrayClearWithFilter.filter(x => x.nomeFantasia === FilterTable.ValorNomeFantasia);
            EmpresaDataFilter = 1
        }

        return DataEmpresaArrayClearWithFilter
    }

    const RenderData = () => {

        let DataEmpresaArrayClearWithFilter = RenderDataFilterTable()

        let position = 1;
        let positionLimite = 0;
        let DataEmpresaArrayClear = []

        DataEmpresaArrayClearWithFilter.map((key, index) => {
            let empresaTableListDTO = new EmpresaTableListDTO(position, key.cnpj, key.razaoSocial, key.nomeFantasia);
            DataEmpresaArrayClear.push(empresaTableListDTO)
            positionLimite = positionLimite + 1;
            if (positionLimite === 2) {
                positionLimite = 0;
                position = position + 1;
            }
        })



        return DataEmpresaArray = DataEmpresaArrayClear.filter(x => x.Position === EmpresaDataFilter);
    }

    const RenderDataPagination = () => {

        let position = 1;
        let positionLimite = 0;
        let DataEmpresaArrayClear = []

        props.ListaEmpresa.map((key, index) => {
            let empresaTableListDTO = new EmpresaTableListDTO(position, key.cnpj, key.razaoSocial, key.nomeFantasia);
            DataEmpresaArrayClear.push(empresaTableListDTO)
            positionLimite = positionLimite + 1;
            if (positionLimite === 2) {
                positionLimite = 0;
                position = position + 1;
            }
        })

        return DataEmpresaArray = DataEmpresaArrayClear;
    }

    const DadosPaginations = RenderDataPagination()
    const DadosTable = RenderData()

    useEffect(() => {
        //dispatch({ type: 'LIST_EMPRESA_FILTER', ListaEmpresaFilter: DataEmpresaArray.filter(x => x.Position === 1) })
    });

    return (
        <div>
            <TableData DadosTable={DadosTable}></TableData>
            <Pagination DadosPaginations={DadosPaginations} PositionFilter={EmpresaDataFilter}></Pagination>
        </div>

    )
}

export default TablePagination

