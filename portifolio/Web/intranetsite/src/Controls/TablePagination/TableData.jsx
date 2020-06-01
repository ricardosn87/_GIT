
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { SearchTableDTO } from './SearchTableDTO';
import { useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as Actions from '../../Gerenciamento/Empresa/EmpresaActions'
import { ChangeCompanyDTO } from './ChangeCompanyDTO';


export default function TableData(props) {

    const dispatch = useDispatch();

    const [valorCNPJ, SetValorCNPJ] = useState(null);
    const [valorRazaoSocial, SetValorRazaoSocial] = useState(null);
    const [valorNomeFantasia, SetValorNomeFantasia] = useState(null);
    const [show, SetClose] = useState(false);

    const [valorCNPJEdit, SetValorCNPJEdit] = useState(null);
    const [valorRazaoSocialEdit, SetValorRazaoSocialEdit] = useState(null);
    const [valorNomeFantasiaEdit, SetValorNomeFantasiaEdit] = useState(null);

    const changeCompany = useSelector(State => State.EmpresaState.ChangeCompany)

    function handleClose() {
        SetClose(false)
        dispatch({ type: 'CHANGE_COMPANY', ChangeCompany: false })
    }

    const SearchTable = (valorCNPJ, valorRazaoSocial, valorNomeFantasia) => {
        var searchTableDTO = new SearchTableDTO(valorCNPJ, valorRazaoSocial, valorNomeFantasia)
        if (valorCNPJ !== null || valorRazaoSocial !== null || valorNomeFantasia !== null) {
            dispatch({ type: 'SEARCH_FILTER_TABLE', FilterTable: searchTableDTO })
        }
    }

    const BotaoEditar = (CNPJ, RazaoSocial, NomeFantasia) => {
        SetClose(true)
        SetValorCNPJEdit(CNPJ)
        SetValorRazaoSocialEdit(RazaoSocial)
        SetValorNomeFantasiaEdit(NomeFantasia)
    }

    const ChangeRazaoSocial = (RazaoSocial) => {
        SetValorRazaoSocialEdit(RazaoSocial)
    }

    const ChangeNomeFantasia = (NomeFantasia) => {
        SetValorNomeFantasiaEdit(NomeFantasia)
    }

    function SaveChanges() {
        var changeCompanyDTO = new ChangeCompanyDTO(valorCNPJEdit, valorRazaoSocialEdit, valorNomeFantasiaEdit)
        Actions.ActionChangeCompany(dispatch, changeCompanyDTO)

    }


    const RenderDatas = () => {

        if (props.DadosTable !== undefined) {
            return props.DadosTable.map((key, index) => {
                return (
                    <tr key={index}>
                        <td>{key.CNPJ}</td>
                        <td>{key.RazaoSocial}</td>
                        <td>{key.NomeFantasia}</td>
                        <td><a className="btn btn-primary" value={key.CNPJ} href="#" onClick={() => BotaoEditar(key.CNPJ, key.RazaoSocial, key.NomeFantasia)} role="button">Editar</a></td>
                    </tr>
                )
            })
        }
    }

    useEffect(() => {
        SearchTable(valorCNPJ, valorRazaoSocial, valorNomeFantasia)
    }, [valorCNPJ, valorRazaoSocial, valorNomeFantasia]);

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">  <input onChange={e => SetValorCNPJ(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Busca CNPJ" aria-label="Busca CNPJ" /></th>
                        <th scope="col">  <input onChange={e => SetValorRazaoSocial(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Busca Razão Social" aria-label="Busca Razão Social" /></th>
                        <th scope="col">  <input onChange={e => SetValorNomeFantasia(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Busca Nome Fantasia" aria-label="Busca Nome Fantasia" /></th>
                        <th scope="col" align="center"> Ação </th>
                    </tr>
                    <tr>
                        <th scope="col">CNPJ</th>
                        <th scope="col">Razão Social</th>
                        <th scope="col">Nome Fantasia</th>
                        <th scope="col" align="center"> Ação </th>
                    </tr>
                </thead>
                <tbody>
                    {RenderDatas()}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alteração de Empresa.</Modal.Title>
                </Modal.Header>
                <div>
                    {changeCompany === false &&
                        <>
                            <Modal.Body>
                                <form>
                                    <div className="form-group">
                                        <label for="formGroupExampleInput">CNPJ</label>
                                        <input disabled={true} type="text" value={valorCNPJEdit} className="form-control" id="formGroupExampleInput" placeholder="Example input" />
                                    </div>
                                    <div className="form-group">
                                        <label for="formGroupExampleInput2">Razão Social</label>
                                        <input type="text" onChange={e => ChangeRazaoSocial(e.target.value)} value={valorRazaoSocialEdit} className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                                    </div>
                                    <div className="form-group">
                                        <label for="formGroupExampleInput2">Nome Fantasia</label>
                                        <input type="text" onChange={e => ChangeNomeFantasia(e.target.value)} value={valorNomeFantasiaEdit} className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                            </Button>
                                <Button variant="primary" onClick={SaveChanges} >
                                    Salvar Alterações
                            </Button>
                            </Modal.Footer>
                        </>
                    }
                    {changeCompany === true &&
                        <>
                            <Modal.Body>
                                <form>
                                    <div className="alert alert-success" role="alert">
                                        <h4 className="alert-heading">Sucesso!</h4>
                                        <p>Atualização de empresa realizado com sucesso.</p>
                                        <hr />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </>
                    }

                    {changeCompany === null &&
                        <>
                            <Modal.Body>
                                <form>
                                    <div className="alert alert-danger" role="alert">
                                        <h4 className="alert-heading">Erro!</h4>
                                        <p>Atualização de empresa retornou erro.</p>
                                        <hr />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </>
                    }

                </div>

            </Modal>
        </div>
    )
}

