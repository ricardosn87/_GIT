
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

    const [valorCNPJ, SetValorCNPJ] = useState('');
    const [valorRazaoSocial, SetValorRazaoSocial] = useState('');
    const [valorNomeFantasia, SetValorNomeFantasia] = useState('');
    const [show, SetClose] = useState(false);

    const [valorCNPJEdit, SetValorCNPJEdit] = useState('');
    const [valorRazaoSocialEdit, SetValorRazaoSocialEdit] = useState('');
    const [valorNomeFantasiaEdit, SetValorNomeFantasiaEdit] = useState('');

    const [inativarEmpresa, SetInativarEmpresa] = useState(false);
    const [aceitaTermos, SetAceitaTermos] = useState(false);

    const changeCompany = useSelector(State => State.EmpresaState.ChangeCompany)

    function handleClose() {
        SetClose(false)
        SetInativarEmpresa(false)
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

    function InativarEmpresa() {
        SetInativarEmpresa(true)
    }

    function SairInativarEmpresa() {
        SetInativarEmpresa(false)
        SetClose(false)
    }

    function AceitaTermos() {
        if (aceitaTermos)
            SetAceitaTermos(false)
        else SetAceitaTermos(true)
    }

    function ConcluirInativarEmpresa(){
        
    }


    const RenderDatas = () => {

        if (props.DadosTable !== undefined) {
            return props.DadosTable.map((key, index) => {
                return (
                    <tr key={index}>
                        <td>{key.CNPJ}</td>
                        <td>{key.RazaoSocial}</td>
                        <td>{key.NomeFantasia}</td>
                        <td><a className="btn btn-primary" href="#" onClick={() => BotaoEditar(key.CNPJ, key.RazaoSocial, key.NomeFantasia)} role="button">Editar</a></td>
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
                    {changeCompany === false && inativarEmpresa === false &&
                        <>
                            <Modal.Body>
                                <form>
                                    <div className="form-group">
                                        <label >CNPJ</label>
                                        <input disabled={true} type="text" value={valorCNPJEdit} className="form-control" id="formGroupExampleInput" placeholder="Example input" />
                                    </div>
                                    <div className="form-group">
                                        <label >Razão Social</label>
                                        <input type="text" onChange={e => ChangeRazaoSocial(e.target.value)} value={valorRazaoSocialEdit} className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                                    </div>
                                    <div className="form-group">
                                        <label >Nome Fantasia</label>
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
                                <Button variant="danger" onClick={InativarEmpresa} >
                                    Inativa Empresa
                            </Button>
                            </Modal.Footer>
                        </>
                    }
                    {changeCompany === true && inativarEmpresa === false &&
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

                    {changeCompany === null && inativarEmpresa === false &&
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

                    {inativarEmpresa &&
                        <>
                            <Modal.Body>
                                <div className="alert alert-warning" role="alert">
                                    <h4 className="alert-heading">Atenção!</h4>
                                    <p><h6>CNPJ:</h6>{valorCNPJEdit}</p>
                                    <p>Ao concordar com o termo, todas as Marcas e Produtos serão inativados.</p>
                                    <p>Todos os Produtos do E-Commerce relacionados aos pedidos, só serão retirados do ar após os mesmos serem concluídos ou cancelados pelo os clientes.</p>
                                    <hr />
                                    <p className="mb-0"> <input type="checkbox" onChange={AceitaTermos} aria-label="Checkbox for following text input" /> Estou de acordo.</p>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" disabled={!aceitaTermos} onClick={ConcluirInativarEmpresa} >
                                    Concluir
                                </Button>
                                <Button variant="secondary" onClick={SairInativarEmpresa} >
                                    Sair
                                </Button>
                            </Modal.Footer>
                        </>
                    }

                </div>

            </Modal>
        </div>
    )
}

