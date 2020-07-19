import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProfile } from './../../Usuario/UserProfile/UserProfile';
import * as Actions from '../Marca/MarcaActions'
import { TableDataDTO } from './Model/TableDataDTO';
import { MarcaEdit } from './MarcaEdit/MarcaEdit';
import { IndexDBDTO } from './Model/IndexDBDTO';
import { useIndexedDB } from 'react-indexed-db';



export const MarcaTableList = () => {

    var ListaMarcasEdit = []
    const dispatch = useDispatch()

    //const [ListaMarcasEdit, SetListaMarcasEdit] = useState([])
    //const [showPage,SetShowPage] = useState(false)

    const ListaMarcas = useSelector(
        state => state.MarcaState.ListaMarcas
    ) 

    const MarcaEditClose = useSelector(
        state => state.MarcaState.MarcaEditClose
    )

    const PositionPaginationMarca = useSelector(
        state => state.MarcaState.PositionPaginationMarca
    )

    const ValorMarcaFiltered = useSelector(
        state => state.MarcaState.ValorMarcaFiltered
    )

    const ValorDescricaoFiltered = useSelector(
        state => state.MarcaState.ValorDescricaoFiltered
    )

    const ValorEmpresaFiltered = useSelector(
        state => state.MarcaState.ValorEmpresaFiltered
    )

    const TableListEffectState = useSelector(
        state => state.MarcaState.TableListEffectState
    )

    const InitLoad = () => {

        var userProfile = new UserProfile('');
        let email = userProfile.GetLoginStorage();

        Actions.GetMarcaByEmailUser(dispatch, email)

    }

    const SalvarIndexDB = (ListaMarcas) => {

        if (ListaMarcas !== undefined && ListaMarcas.length > 0) {

            if (ListaMarcasEdit.length !== ListaMarcas.length)
                ListaMarcasEdit = ListaMarcas
        }
    }

    const SelectedPagination = (index) => {
        dispatch({ type: 'SET_POSITION_PAGINATION_MARCA', PositionPaginationMarca: index })
    }

    const ControlPagination = (ListaMarcasEdit) => {


        var controlPosition = [];
        var positionPage = 0
        var positionPageMax = 3

        if (ListaMarcasEdit !== undefined && ListaMarcasEdit.length > 0) {
            ListaMarcasEdit.map((value, index) => {


                if (positionPage !== value.idIndex) {
                    positionPage = value.idIndex
                    if (positionPage <= positionPageMax)
                        controlPosition.push(<li onClick={() => SelectedPagination(positionPage)} className="page-item"><a className="page-link" href="#">{positionPage}</a></li>)
                }
            })
        }

        return controlPosition
    }

    function SelectLike(ListaMarcasEdit) {

        var Filter = false
        var ListaMarcasArray = [];
        if (ListaMarcasEdit !== undefined && ListaMarcasEdit.length > 0) {
            ListaMarcasArray = ListaMarcasEdit
            var ListaMarcasArrayNome = []
            var ListaMarcasArrayDescricao = []
            var ListaMarcasArrayEmpresa = []
            ListaMarcasArray.map((value, index) => {
                if (ValorMarcaFiltered !== null) {
                    Filter = true
                    if (value.nome.includes(ValorMarcaFiltered) === true) {
                        ListaMarcasArrayNome.push(value)
                    }
                }
            })

            if (Filter) {
                ListaMarcasArray = ListaMarcasArrayNome
                Filter = false
            }

            ListaMarcasArray.map((value, index) => {
                if (ValorDescricaoFiltered !== null) {
                    Filter = true
                    if (value.descricao.includes(ValorDescricaoFiltered) === true) {
                        ListaMarcasArrayDescricao.push(value)
                    }
                }
            })

            if (Filter) {
                ListaMarcasArray = ListaMarcasArrayDescricao
                Filter = false
            }

            ListaMarcasArray.map((value, index) => {
                if (ValorEmpresaFiltered > 0) {
                    Filter = true
                    if (value.idEmpresa === ValorEmpresaFiltered) {
                        ListaMarcasArrayEmpresa.push(value)
                    }
                }
            })

            if (Filter) {
                ListaMarcasArray = ListaMarcasArrayEmpresa
                Filter = false
            }
        }
      
        return ListaMarcasArray;
    }


    const ReturnDataRender = (ListaMarcasEdit) => {

        if (ListaMarcasEdit !== undefined && ListaMarcasEdit.length > 0) {
            //var reg = ListaMarcasEdit.filter(x => x.idIndex === PositionPaginationMarca);
            var reg = ListaMarcasEdit
            if (reg !== undefined && reg.length > 0) {
                return reg.map((value, index) => {

                    return <tr key={value.idMarca}>
                        <td>{value.nome}</td>
                        <td>{value.descricao}</td>
                        <td>{value.nomeEmpresa}</td>
                        <td><a className="btn btn-primary" id="btnMarcaEdit" href="#"
                            onClick={() => OpenModalEdit(
                                value.idMarca,
                                value.nome,
                                value.descricao,
                                value.ativo,
                                value.idEmpresa
                            )}
                            role="button">Editar</a></td>
                    </tr>
                })
            }
        }
    }

    const OpenModalEdit = (IdMarca, Nome, Descricao, Ativo, IdEmpresa) => {
        var tableDataDTO = new TableDataDTO(IdMarca,
            Nome,
            Descricao,
            Ativo,
            IdEmpresa);
        dispatch({ type: 'SET_MARCA_EDIT_CLOSE', MarcaEditClose: true })
        dispatch({ type: 'SEND_EDIT_MARCA_DTO', MarcaEditDTO: tableDataDTO })
    }


    if (ValorMarcaFiltered !== null || ValorDescricaoFiltered !== null || ValorEmpresaFiltered > 0 && TableListEffectState === false) {
        ListaMarcasEdit =  SelectLike(ListaMarcas)
    }
    else{
        SalvarIndexDB(ListaMarcas)
    }
    

    useEffect(() => {

        if (TableListEffectState) {
            InitLoad()
            dispatch({ type: 'TABLE_LIST_EFFECT', TableListEffectState: false })
        }

    }, [TableListEffectState])

    return (

        <div>

            <h1>ListaMarcas {ListaMarcas !== undefined ? ListaMarcas.length : 0}</h1>
            <h1>ListaMarcasEdit {ListaMarcasEdit !== undefined ? ListaMarcasEdit.length : 0}</h1>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ReturnDataRender(ListaMarcasEdit)}
                    </tbody>
                    <tfoot>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="#" tabindex="-1">Previous</a>
                                </li>
                                {ControlPagination(ListaMarcasEdit)}
                                <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </tfoot>
                </table>
            </div>
            {MarcaEditClose &&
                <MarcaEdit Open={true}></MarcaEdit>
            }
        </div>
    )
}


