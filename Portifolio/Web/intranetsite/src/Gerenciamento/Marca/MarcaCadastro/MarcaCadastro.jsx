import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import * as Actions from '../MarcaActions'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { SaveMarcaDTO } from './../Model/SaveMarcaDTO';


export const MarcaCadastro = () => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [ValorNomeMarca, SetValorNomeMarca] = useState('');
    const [ValorDescricaoMarca, SetValorDescricaoMarca] = useState('');
    const [ValorEmpresa, SetValorCompany] = useState(0);

    const GetMarcaByNomeState = useSelector(
        State => State.MarcaState.GetMarcaByNomeState
    )
    const GetDescriptionByNomeState = useSelector(
        State => State.MarcaState.GetDescriptionByNomeState
    )

    const ListaEmpresa = useSelector(
        state => state.EmpresaState.ListaEmpresa
    )

    const SaveMarcaState = useSelector(
        State => State.MarcaState.SaveMarcaState
    )

    const handleClose = () => {
        setShow(false);
        SetValorNomeMarca('')
        SetValorDescricaoMarca('')
        SetValorCompany(0)
        dispatch({ type: 'GET_MARCA_DESCRICAO', GetDescriptionByNomeState: null })
        dispatch({ type: 'GET_MARCA_NOME', GetMarcaByNomeState: null })
        dispatch({ type: 'SAVE_MARCA', SaveMarcaState: null })
    }

    const handleShow = () => setShow(true);

    const ChangeEmploy = employ => {
        if (employ !== 'Selecione:') {
            var employInteiro = parseInt(employ)
            SetValorCompany(employInteiro)
        } else {
            SetValorCompany(0)
        }
    }

    const ChangeEmployStyle = employ => {
        if (employ > 0) {
            return 'was-validated'
        } else {
            return 'form-group'
        }
    }

    function PopulateSelectCompany(ListaEmpresa) {
        var listOptionsCompany = []

        if (ListaEmpresa !== undefined) {
            ListaEmpresa.map((key, index) => {
                var option = (
                    <option value={key.idEmpresa}>
                        CNPJ: {key.cnpj} - Razão Social:{key.razaoSocial}
                    </option>
                )
                listOptionsCompany.push(option)
            })
        }
        return listOptionsCompany
    }

    const ChangeDescricaoMarca = (descricaoMarca) => {
        SetValorDescricaoMarca(descricaoMarca)
        if (descricaoMarca !== '')
            dispatch({ type: 'GET_MARCA_DESCRICAO', GetDescriptionByNomeState: 200 })
        else dispatch({ type: 'GET_MARCA_DESCRICAO', GetDescriptionByNomeState: null })
    }
    function ReturnControlDescriptionStatusState(status) {
        if (status === 200) {
            return <input
                onChange={e => ChangeDescricaoMarca(e.target.value)}
                value={ValorDescricaoMarca}
                type="text" className="form-control is-valid" placeholder="Nome" required></input>
        }
        else {
            return <input
                onChange={e => ChangeDescricaoMarca(e.target.value)}
                value={ValorDescricaoMarca}
                type="text" className="form-control" placeholder="Nome" required></input>
        }
    }

    function ReturnTypeDescriptionStatusState(status) {
        if (status === 200) {
            return <div className="valid-feedback"> Valido!  </div >
        }
        else {
            return null
        }
    }

    const ChangeNomeMarca = (nomeMarca) => {
        SetValorNomeMarca(nomeMarca)
        if (nomeMarca !== '')
            Actions.GetMarcaByNome(dispatch, nomeMarca)
        else dispatch({ type: 'GET_MARCA_NOME', GetMarcaByNomeState: null })
    }

    function ReturnTextStateDecription(status) {
        if (status === 404) {
            return <div className="valid-feedback"> Valido!  </div >
        }
        else if (status === 200) {
            return <div className="invalid-feedback"> O nome já existe.</div>
        }
        else {
            return null
        }
    }

    function ReturnTextStatusState(status) {
        if (status === 404) {
            return <input
                onChange={e => ChangeNomeMarca(e.target.value)}
                value={ValorNomeMarca}
                type="text" className="form-control is-valid" placeholder="Nome" required></input>
        }
        else if (status === 200) {
            return <input
                onChange={e => ChangeNomeMarca(e.target.value)}
                value={ValorNomeMarca}
                type="text" className="form-control is-invalid" placeholder="Nome" required></input>
        }
        else if (status === null) {
            return <input
                onChange={e => ChangeNomeMarca(e.target.value)}
                value={ValorNomeMarca}
                type="text" className="form-control" placeholder="Nome" required></input>
        }
    }

    function EnableButtonSaveMarca() {
        if (ValorNomeMarca !== '' && ValorDescricaoMarca !== '' && ValorEmpresa !== 0) {
            return <Button variant="primary" onClick={SaveMarca}>
                       Salvar
                </Button>
        }
        else{
            return <Button variant="primary" onClick={SaveMarca} disabled>
                Salvar
            </Button>
        }
    }

    function SaveMarca() {
        var saveMarcaDTO = new SaveMarcaDTO(ValorNomeMarca, ValorDescricaoMarca, ValorEmpresa)
        Actions.SaveMarca(dispatch, saveMarcaDTO)
    }

    return (
        <>
            <div>
                <nav className='navbar navbar-light bg-light justify-content-between'>
                    <a className='navbar-brand'>Gerenciamento de Marcas</a>
                    <form className='form-inline'>
                        <Button variant='primary' onClick={handleShow} >
                            Novo
                    </Button>
                    </form>
                </nav>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Marca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {SaveMarcaState === null &&
                            <form className='needs-validation' novalidate>
                                <div className='form-group'>
                                    <label>Nome</label>
                                    {ReturnTextStatusState(GetMarcaByNomeState)}
                                    {ReturnTextStateDecription(GetMarcaByNomeState)}
                                </div>
                                <div className='form-group'>
                                    <label>Descrição</label>
                                    {ReturnControlDescriptionStatusState(GetDescriptionByNomeState)}
                                    {ReturnTypeDescriptionStatusState(GetDescriptionByNomeState)}
                                </div>
                                <div className={ChangeEmployStyle(ValorEmpresa)}>
                                    <label>Empresa</label>
                                    <select className="custom-select" onChange={e => ChangeEmploy(e.target.value)} required>
                                        <option value={undefined}>Selecione:</option>
                                        {PopulateSelectCompany(ListaEmpresa)}
                                    </select>
                                    <div className="invalid-feedback">Example invalid custom select feedback</div>
                                </div>
                            </form>
                        }
                        {SaveMarcaState === 200 &&
                            <div className='alert alert-success' role='alert'>
                                <h4 className='alert-heading'>Sucesso!</h4>
                                <p>Cadastro de Marca realizado com sucesso.</p>
                                <hr />
                            </div>
                        }
                        {SaveMarcaState !== 200 && SaveMarcaState !== null &&
                            <div className='alert alert-danger' role='alert'>
                                <h4 className='alert-heading'>Erro!</h4>
                                <p>Erro inesperado.</p>
                                <hr />
                            </div>
                        }

                    </>
                </Modal.Body>
                <Modal.Footer>

                    {SaveMarcaState === null &&
                        <div>
                            <Button variant="secondary" onClick={handleClose}>
                                Fechar
                            </Button>
                           {EnableButtonSaveMarca()}
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}