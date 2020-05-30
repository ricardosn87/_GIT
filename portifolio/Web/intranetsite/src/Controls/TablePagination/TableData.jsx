
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useSelector, useEffect } from "react";
import { SearchTableDTO } from './SearchTableDTO';
import { useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TableData(props) {

    const dispatch = useDispatch();

    const [valorCNPJ, SetValorCNPJ] = useState(null);
    const [valorRazaoSocial, SetValorRazaoSocial] = useState(null);
    const [valorNomeFantasia, SetValorNomeFantasia] = useState(null);
    const [show, SetClose] = useState(false);

    const [valorCNPJEdit,SetValorCNPJEdit] = useState(null);
    const [valorRazaoSocialEdit,SetValorRazaoSocialEdit] = useState(null);
    const [valorNomeFantasiaEdit,SetValorNomeFantasiaEdit] = useState(null);

    function handleClose() {
        SetClose(false)
        
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
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label for="formGroupExampleInput">CNPJ</label>
                            <input disabled={true} type="text" value={valorCNPJEdit} className="form-control" id="formGroupExampleInput" placeholder="Example input" />
                        </div>
                        <div className="form-group">
                            <label for="formGroupExampleInput2">Razão Social</label>
                            <input type="text" value={valorRazaoSocialEdit} className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                        </div>
                        <div className="form-group">
                            <label for="formGroupExampleInput2">Nome Fantasia</label>
                            <input type="text" value={valorNomeFantasiaEdit} className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" >
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

