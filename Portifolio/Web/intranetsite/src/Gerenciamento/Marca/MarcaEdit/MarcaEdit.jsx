import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import * as Actions from '../MarcaActions'
import { SaveMarcaDTO } from './../Model/SaveMarcaDTO';
import { EditMarcaDTO } from './../Model/EditMarcaDTO';

/* export const MarcaEdit = ({ idMarca, nome, descricao, ativo, idEmpresa }) => { */
export const MarcaEdit = ({ Open }) => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(Open);
    const [ValorNomeMarca, SetValorNomeMarca] = useState('');
    const [ValorDescricaoMarca, SetValorDescricaoMarca] = useState('');
    const [ValorEmpresa, SetValorCompany] = useState(0);

    const [NomeMarcaChange, SetNomeMarcaChange] = useState(false)
    const [DescricaoMarcaChange, SetDescricaoMarcaChange] = useState(false)
    const [EmpresaMarcaChange, SetEmpresaMarcaChange] = useState(false)

    const GetMarcaByNomeState = useSelector(
        State => State.MarcaState.GetMarcaByNomeState
    )

    const GetDescriptionByNomeState = useSelector(
        State => State.MarcaState.GetDescriptionByNomeState
    )

    const EditMarcaState = useSelector(
        State => State.MarcaState.EditMarcaState
    )

    const ListaEmpresa = useSelector(
        state => state.EmpresaState.ListaEmpresa
    )

    const MarcaEditDTO = useSelector(
        state => state.MarcaState.MarcaEditDTO
    )



    const handleClose = () => {
        setShow(false)
        SetValorNomeMarca('')
        SetValorDescricaoMarca('')
        SetValorCompany(0)
        dispatch({ type: 'SET_MARCA_EDIT_CLOSE', MarcaEditClose: false })
        dispatch({ type: 'GET_MARCA_DESCRICAO', GetDescriptionByNomeState: null })
        dispatch({ type: 'GET_MARCA_NOME', GetMarcaByNomeState: null })
        dispatch({ type: 'EDIT_MARCA', EditMarcaState: null })
    }

    const ChangeNomeMarca = (nomeMarca) => {
        SetNomeMarcaChange(true)
        SetValorNomeMarca(nomeMarca)
        if (nomeMarca !== '')
            Actions.GetMarcaByNome(dispatch, nomeMarca)
        else dispatch({ type: 'GET_MARCA_NOME', GetMarcaByNomeState: null })
    }

    function ReturnTextStatusState(status) {
        if (ValorNomeMarca === MarcaEditDTO.Nome) {
            return <input
                onChange={e => ChangeNomeMarca(e.target.value)}
                value={ValorNomeMarca}
                type="text" className="form-control" placeholder="Nome" required></input>
        }
        else if (status === 404) {
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

    const ChangeDescricaoMarca = (descricaoMarca) => {
        SetDescricaoMarcaChange(true)
        SetValorDescricaoMarca(descricaoMarca)

        if (descricaoMarca !== '')
            dispatch({ type: 'GET_MARCA_DESCRICAO', GetDescriptionByNomeState: 200 })
        else dispatch({ type: 'GET_MARCA_DESCRICAO', GetDescriptionByNomeState: null })
    }

    function ReturnControlDescriptionStatusState(status) {
        if (ValorDescricaoMarca === MarcaEditDTO.Descricao) {
            return <input
                onChange={e => ChangeDescricaoMarca(e.target.value)}
                value={ValorDescricaoMarca}
                type="text" className="form-control" placeholder="Nome" required></input>
        }
        else if (status === 200) {
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

    const ChangeEmployStyle = employ => {
        if (employ > 0) {
            return 'was-validated'
        } else {
            return 'form-group'
        }
    }

    const ChangeEmploy = employ => {
        SetEmpresaMarcaChange(true)
        if (employ !== 'Selecione:') {
            var employInteiro = parseInt(employ)
            SetValorCompany(employInteiro)
        } else {
            SetValorCompany(0)
        }
    }

    function PopulateSelectCompany(ListaEmpresa) {
        var listOptionsCompany = []

        if (ListaEmpresa !== undefined) {
            ListaEmpresa.map((key, index) => {
                var option = (
                    <option value={key.idEmpresa} selected={ValorEmpresa === key.idEmpresa ? true : false}>
                        CNPJ: {key.cnpj} - Razão Social:{key.razaoSocial}
                    </option>
                )
                listOptionsCompany.push(option)
            })
        }
        return listOptionsCompany
    }

    function EnableButtonSaveMarca() {
        if (ValorNomeMarca !== '' && ValorDescricaoMarca !== '' && ValorEmpresa !== 0) {
            return <Button variant="primary" onClick={SaveMarca}>
                Salvar
                </Button>
        }
        else {
            return <Button variant="primary" onClick={SaveMarca} disabled>
                Salvar
            </Button>
        }
    }

    function SaveMarca() {
        var saveMarcaDTO = new EditMarcaDTO(MarcaEditDTO.IdMarca, ValorNomeMarca, ValorDescricaoMarca, ValorEmpresa)
        Actions.EditMarca(dispatch, saveMarcaDTO);
        dispatch({ type: 'TABLE_LIST_EFFECT', TableListEffectState: true })
    }
    useEffect(() => {
        if (!NomeMarcaChange) {
            SetValorNomeMarca(MarcaEditDTO.Nome)
        }
        if (!DescricaoMarcaChange) {
            SetValorDescricaoMarca(MarcaEditDTO.Descricao)
        }
        if (!EmpresaMarcaChange) {
            SetValorCompany(MarcaEditDTO.IdEmpresa)
        }
    });


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {EditMarcaState === null &&

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

                        {EditMarcaState === 200 &&
                            <div className='alert alert-success' role='alert'>
                                <h4 className='alert-heading'>Sucesso!</h4>
                                <p>Atualização de Marca realizado com sucesso.</p>
                                <hr />
                            </div>
                        }
                        {EditMarcaState !== 200 && EditMarcaState !== null &&
                            <div className='alert alert-danger' role='alert'>
                                <h4 className='alert-heading'>Erro!</h4>
                                <p>Erro inesperado.</p>
                                <hr />
                            </div>
                        }

                    </>
                </Modal.Body>
                <Modal.Footer>
                    {EditMarcaState === null &&
                        <div>
                            <Button variant="secondary" onClick={handleClose}>
                                Fechar
                            </Button>
                            {' '}
                            {EnableButtonSaveMarca()}
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )

}