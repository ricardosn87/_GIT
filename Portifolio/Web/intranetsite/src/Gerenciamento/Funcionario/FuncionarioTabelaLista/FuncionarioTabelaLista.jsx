import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux'
import { ValidarCpf } from './../../../Util/Validacao/ValidarCpf';
import * as Actions from '../FuncionarioActions'
import { useDispatch } from 'react-redux'
import { ValidarEmail } from './../../../Util/Validacao/ValidarEmail';
import { EmployeeUpdateDTO } from './../Model/EmployeeUpdateDTO';
import { TableListDataEmployeeDTO } from './../Model/TableListDataEmployeeDTO';
import { PaginationDTO } from './../../../Controls/TablePagination/PaginationDTO';

function getArrayMax(array) {
    return Math.max.apply(null, array);
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}


export const FuncionarioTabelaLista = ({ ListaFuncionariosArray }) => {
    const dispatch = useDispatch()

    const ListaEmpresa = useSelector(
        State => State.EmpresaState.ListaEmpresa
    )
    const CPFExisteStatus = useSelector(
        State => State.FuncionarioState.CPFExisteStatus
    )
    const EmailExisteStatus = useSelector(
        State => State.FuncionarioState.EmailExisteStatus
    )

    const UpdateEmployeeState = useSelector(
        State => State.FuncionarioState.UpdateEmployeeState
    )

    const EmployeeChoosePositionTable = useSelector(
        State => State.FuncionarioState.EmployeeChoosePositionTable
    )

    const defautPositionFilter = 1

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [ValorCNPJEdit, SetValorCNPJEdit] = useState(0);
    const [ValorCPFEdit, SetValorCPFEdit] = useState('');
    const [ValorCPFEditCurrent, SetValorCPFEditCurrent] = useState('');
    const [ValorNomeEdit, SetValorNomeEdit] = useState('');
    const [ValorEmailEdit, SetValorEmailEdit] = useState('');
    const [ValorEmailEditCurrent, SetValorEmailEditCurrent] = useState('');


    const [FirtsClickCPF, SetFirtsClickCPF] = useState(false)
    const [FirtsClick, SetFirtsClick] = useState(false)
    const [FirtsClickEmail, SetFirtsClickEmail] = useState(false)
    const [FirtsClickCompany, SetFirtsClickCompany] = useState(false)

    const [CPFValid, SetCPFValid] = useState(false)
    const [NomeValid, SetNomeValid] = useState(false)
    const [EmailValid, SetEmailValid] = useState(false)
    const [CompanyValid, SetCompanyValid] = useState(false)


    function handleClose() {
        if (show) {
            setShow(false);
            SetValorCNPJEdit(0)
            SetValorCPFEdit('')
            SetValorCPFEditCurrent('')
            SetValorNomeEdit('')
            SetValorEmailEdit('');
            SetValorEmailEditCurrent('')

            SetFirtsClick(false)
            SetFirtsClickEmail(false)
            SetFirtsClickCPF(false)
            SetFirtsClickCompany(false)

            dispatch({
                type: 'UPDATE_EMPLOYEE',
                UpdateEmployeeState: null
            })

        }
    }


    const BotaoEditar = (CNPJ, CPF, Nome, Email) => {
        handleShow()
        SetValorCNPJEdit(Number(CNPJ))
        SetValorCPFEdit(CPF)
        SetValorCPFEditCurrent(CPF)
        SetValorNomeEdit(Nome)
        SetValorEmailEdit(Email);
        SetValorEmailEditCurrent(Email)
        dispatch({
            type: 'GET_CPF_EXIST',
            CPFExisteStatus: 0
        })
        dispatch({
            type: 'GET_EMAIL_EXIST',
            EmailExisteStatus: 0
        })
    }

    function ChangeCPF(cpf) {
        SetValorCPFEdit(cpf)
        SetFirtsClickCPF(true)
        if (ValidarCpf.cpf(cpf) === false) {
            SetCPFValid(false)
            dispatch({ type: 'GET_CPF_EXIST', CPFExisteStatus: 400 })
        } else {
            SetCPFValid(true)
            Actions.GetFuncionarioByCPF(dispatch, cpf)
        }
    }
    function ReturnStatusCPF(status) {
        switch (status) {
            case 0:
                return null
            case 404:
                return 'valid'
            default:
                if (ValorCPFEditCurrent === ValorCPFEdit && FirtsClickCPF === false) {
                    return null
                }
                else if (ValorCPFEditCurrent === ValorCPFEdit && FirtsClickCPF) {
                    return 'valid'
                }
                return 'invalid'
        }
    }
    function ReturnStatusCPFDescription(status) {
        switch (status) {
            case 400:
                return 'CPF Inválido.'
            case 200:
                if (ValorCPFEditCurrent === ValorCPFEdit && FirtsClickCPF === false) {
                    return null
                }
                else if (ValorCPFEditCurrent === ValorCPFEdit && FirtsClickCPF) {
                    return 'CPF Válido.'
                }
                return 'CPF Existente, favor escolher outro.'
            default:
                return null
        }
    }
    function ChangeNome(Nome) {
        SetValorNomeEdit(Nome)
        SetFirtsClick(true)
        if (Nome === '')
            SetNomeValid(false)
        else
            SetNomeValid(true)
    }
    function ReturnStatusShowNomeDescription(nome) {
        if (nome === '' && FirtsClick === false) {
            return null
        } else if (nome === '' && FirtsClick === true) {
            return 'invalid'
        } else if (nome !== '' && FirtsClick === true) return 'valid'
    }
    function ReturnStatusHiddenDescription(nome) {
        if (nome === '' && FirtsClick === false) {
            return true
        } else if (nome === '' && FirtsClick === true) {
            return true
        } else if (nome !== '' && FirtsClick === false) {
            return true
        }
        else return false
    }
    function ReturnStatusNomeDescription(nome) {
        if (nome !== '') {
            return 'Nome Válido'
        } else return 'Nome Inválido'
    }

    function ChangeEmail(email) {
        SetValorEmailEdit(email)
        SetFirtsClickEmail(true)
        if (ValidarEmail.ValidateEmail(email) === false) {
            SetEmailValid(false)
            dispatch({ type: 'GET_EMAIL_EXIST', EmailExisteStatus: 400 })
        } else {
            SetEmailValid(true)
            Actions.GetFuncionarioByEmail(dispatch, email)
        }
    }
    function ReturnStatusEmail(status) {
        switch (status) {
            case 0:
                return null
            case 404:
                return 'valid'
            default:
                if (ValorEmailEditCurrent === ValorEmailEdit && FirtsClickEmail === false) {
                    return null
                }
                else if (ValorEmailEditCurrent === ValorEmailEdit && FirtsClickEmail) {
                    return 'valid'
                }
                return 'invalid'
        }
    }
    function ReturnStatusEmailDescription(status) {
        switch (status) {
            case 400:
                return 'Email Inválido.'
            case 200:
                if (ValorEmailEditCurrent === ValorEmailEdit && FirtsClickEmail === false) {
                    return null
                }
                else if (ValorEmailEditCurrent === ValorEmailEdit && FirtsClickEmail) {
                    return 'Email Válido.'
                }
                return 'Email Existente, favor escolher outro.'
            default:
                return null
        }
    }

    function ChangeEmployee(data) {
        SetFirtsClickCompany(true)
        if (data === '') {
            SetCompanyValid(false)
            SetValorCNPJEdit(Number(0))
        }
        else {
            SetCompanyValid(true)
            SetValorCNPJEdit(parseInt(data))
        }
    }

    function DefaultEmployeeSelected(cnpj) {
        if (ValorCNPJEdit === Number(cnpj)) {
            return true
        }
        else {
            return false
        }
    }
    const ReturnPopulateDropSelectEmploy = data => {
        var listOptionsEmploy = []

        if (data !== undefined) {
            data.map((key, index) => {
                var option = (
                    <option selected={DefaultEmployeeSelected(key.cnpj)} value={key.idEmpresa}>
                        CNPJ: {key.cnpj} - Razão Social:{key.razaoSocial}
                    </option>
                )
                listOptionsEmploy.push(option)
            })
        }

        return listOptionsEmploy
    }

    let DataEmployeeArrayClear = []
    var DataEmployeeArrayClearFilter = []

    function RenderDataPagination(flagWithFilter) {
        let position = 1;
        let positionLimite = 0;
        let DataEmployeeArrayClearInside = []

        if (ListaFuncionariosArray !== undefined && ListaFuncionariosArray.length > 0) {
            ListaFuncionariosArray.map((key, index) => {
                let emp = new TableListDataEmployeeDTO(
                    position,
                    key.razaoSocial,
                    key.funcionarioDTOs[0].cpf,
                    key.funcionarioDTOs[0].nome,
                    key.funcionarioDTOs[0].email,
                    key.funcionarioDTOs[0].dataCadastro,
                    key.cnpj)

                DataEmployeeArrayClearInside.push(emp)
                positionLimite = positionLimite + 1;
                if (positionLimite === 6) {
                    positionLimite = 0;
                    position = position + 1;
                }
            })
        }
        DataEmployeeArrayClear = DataEmployeeArrayClearInside
        DataEmployeeArrayClearFilter = DataEmployeeArrayClear

        if (flagWithFilter) {
            var d = RenderDataPaginationWithFilter(EmployeeChoosePositionTable, DataEmployeeArrayClear)
            return d
        }
        else {
            return DataEmployeeArrayClear
        }
    }

    function RenderDataPaginationWithFilter(chosseEmployee, array) {

        if (chosseEmployee === 1) {
            var d = array.filter(x => x.Position === defautPositionFilter)
            return d;
        }
        else {
            var d = array.filter(x => x.Position === chosseEmployee)
            return d;
        }
    }

    function RenderData() {

        var data = RenderDataPagination(true)

        if (data !== undefined && data.length > 0) {
            return data.map((key, index) => {
                return (
                    <tr key={index}>
                        <td>{key.RazaoSocial}</td>
                        <td>{key.CPF}</td>
                        <td>{key.Nome}</td>
                        <td>{key.Email}</td>
                        <td>{moment(key.DataCadastro).format('YYYY-MM-DD')}</td>
                        <td><a className="btn btn-primary" href="#" onClick={() => BotaoEditar(key.CNPJ, key.CPF, key.Nome, key.Email)} role="button">Editar</a></td>
                    </tr>
                )
            })
        }
    }

    const RenderPositionBefore = () => {
        if (EmployeeChoosePositionTable !== 1) {
            dispatch({ type: 'CHOOSE_EMPLOYEE_POSITION', EmployeeChoosePositionTable: EmployeeChoosePositionTable - 1 })
        }
    }

    const RenderPositionAfter = () => {
        var arrayPositionDistinct = []

        DataEmployeeArrayClearFilter.map((value, index) => {
            arrayPositionDistinct.push(value.Position)
        })

        var dist = arrayPositionDistinct.filter(distinct);

        var maxValue = getArrayMax(dist)
        if (EmployeeChoosePositionTable < maxValue) {
            dispatch({ type: 'CHOOSE_EMPLOYEE_POSITION', EmployeeChoosePositionTable: EmployeeChoosePositionTable + 1 })
        }
    }

    const FilterDataTable = (position) => {
        dispatch({ type: 'CHOOSE_EMPLOYEE_POSITION', EmployeeChoosePositionTable: position })
    }
    const RenderNumberPaginations = () => {
        var arrayPositionDistinct = []

        var data = RenderDataPagination(false)

        data.map((value, index) => {
            arrayPositionDistinct.push(value.Position)
        })
        var dist = arrayPositionDistinct.filter(distinct);
        var maxValue = getArrayMax(dist)

        var Positions = [];
        var conta = maxValue - EmployeeChoosePositionTable;
        if (EmployeeChoosePositionTable === 1) {
            if (maxValue > 2) {
                Positions.push(new PaginationDTO(1, <li className="page-item" onClick={() => (FilterDataTable(1))}><a class="page-link" href="#" >{1}</a></li>))
                Positions.push(new PaginationDTO(2, <li className="page-item" onClick={() => (FilterDataTable(2))}><a class="page-link"  href="#">{2}</a></li>))
                Positions.push(new PaginationDTO(3, <li className="page-item" onClick={() => (FilterDataTable(3))}><a class="page-link" href="#" >{3}</a></li>))
            }
            else if (maxValue === 2) {
                Positions.push(new PaginationDTO(1, <li className="page-item" onClick={() => (FilterDataTable(1))}><a class="page-link" href="#" >{1}</a></li>))
                Positions.push(new PaginationDTO(2, <li className="page-item" onClick={() => (FilterDataTable(2))}><a class="page-link"  href="#">{2}</a></li>))
            }
            else if (maxValue === 1) {
                Positions.push(new PaginationDTO(1, <li className="page-item" onClick={() => (FilterDataTable(1))}><a class="page-link" href="#" >{1}</a></li>))
            }
        }
        else if (conta === 0) {
            if (EmployeeChoosePositionTable === 2) {
                Positions.push(new PaginationDTO(1, <li className="page-item" onClick={() => (FilterDataTable(1))}><a class="page-link" href="#" >{1}</a></li>))
                Positions.push(new PaginationDTO(2, <li className="page-item" onClick={() => (FilterDataTable(2))}><a class="page-link" href="#" >{2}</a></li>))
            }
            else if (EmployeeChoosePositionTable === 3) {
                Positions.push(new PaginationDTO(1, <li className="page-item" onClick={() => (FilterDataTable(1))}><a class="page-link" href="#" >{1}</a></li>))
                Positions.push(new PaginationDTO(2, <li className="page-item" onClick={() => (FilterDataTable(2))}><a class="page-link" href="#" >{2}</a></li>))
                Positions.push(new PaginationDTO(3, <li className="page-item" onClick={() => (FilterDataTable(3))}><a class="page-link" href="#" >{3}</a></li>))
            }
            else {
                var antiPenultimo = EmployeeChoosePositionTable - 2
                Positions.push(new PaginationDTO(antiPenultimo, <li className="page-item" onClick={() => (FilterDataTable(antiPenultimo))}><a class="page-link"href="#"  >{antiPenultimo}</a></li>))
                var penultimo = EmployeeChoosePositionTable - 1
                Positions.push(new PaginationDTO(penultimo, <li className="page-item" onClick={() => (FilterDataTable(penultimo))}><a class="page-link" href="#" >{penultimo}</a></li>))
                Positions.push(new PaginationDTO(maxValue, <li className="page-item" onClick={() => (FilterDataTable(maxValue))}><a class="page-link" href="#"  >{maxValue}</a></li>))
            }
        }
        else if (conta === 1) {

            var antiPenultimo = EmployeeChoosePositionTable - 1
            Positions.push(new PaginationDTO(antiPenultimo, <li className="page-item" onClick={() => (FilterDataTable(antiPenultimo))}><a class="page-link" href="#" >{antiPenultimo}</a></li>))
            Positions.push(new PaginationDTO(EmployeeChoosePositionTable, <li className="page-item" onClick={() => (FilterDataTable(EmployeeChoosePositionTable))}><a class="page-link" href="#" >{EmployeeChoosePositionTable}</a></li>))
            Positions.push(new PaginationDTO(maxValue, <li className="page-item" onClick={() => (FilterDataTable(maxValue))}><a class="page-link" href="#" >{maxValue}</a></li>))
        }
        else if (conta > 1) {
            var antiPenultimo = EmployeeChoosePositionTable - 1
            Positions.push(new PaginationDTO(antiPenultimo, <li className="page-item" onClick={() => (FilterDataTable(antiPenultimo))}><a class="page-link" href="#" >{antiPenultimo}</a></li>))
            Positions.push(new PaginationDTO(EmployeeChoosePositionTable, <li className="page-item" onClick={() => (FilterDataTable(EmployeeChoosePositionTable))}><a class="page-link" href="#" >{EmployeeChoosePositionTable}</a></li>))
            var ultimo = EmployeeChoosePositionTable + 1
            Positions.push(new PaginationDTO(ultimo, <li className="page-item" onClick={() => (FilterDataTable(ultimo))}><a class="page-link" href="#" >{ultimo}</a></li>))
        }
        else {
            Positions.push(new PaginationDTO(1, <li className="page-item" onClick={() => (FilterDataTable(1))}><a class="page-link" href="#" >{1}</a></li>))
        }

        return Positions
    }

    const LinkPositions = RenderNumberPaginations()

    function EnableButtonSaveFuncionario() {
        if (
            !CPFValid ||
            !NomeValid ||
            !EmailValid ||
            !CompanyValid ||

            !FirtsClickCPF &&
            !FirtsClick &&
            !FirtsClickEmail &&
            !FirtsClickCompany ||
            ValorEmailEdit === '' ||
            ValorNomeEdit === '' ||
            ValorCPFEdit === '' ||
            ValorCNPJEdit === 0
        ) {
            return <Button variant='primary' disabled>Salvar</Button>
        }

        else {
            return <Button variant='primary' onClick={AtualizarFuncionario} >Salvar</Button>
        }
    }

    function AtualizarFuncionario() {
        var employeeUpdateDTO = new EmployeeUpdateDTO(ValorCPFEdit, ValorNomeEdit, ValorEmailEdit, ValorCNPJEdit)
        Actions.ActionUpdateEmployee(dispatch, employeeUpdateDTO)
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Empresa</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Data Cadastro</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {RenderData()}
                </tbody>
                <tfoot>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item" onClick={() => RenderPositionBefore()}>
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            {
                                LinkPositions.map(x =>
                                    x.Link
                                )
                            }
                            <li className="page-item" onClick={() => RenderPositionAfter()}>
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </tfoot>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Funcionário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {UpdateEmployeeState === null &&
                        <form className='needs-validation'>
                            <div className="form-group">
                                <label >CPF</label>
                                <input type="text" onChange={e => ChangeCPF(e.target.value)} value={ValorCPFEdit}
                                    className={
                                        'form-control is-' + ReturnStatusCPF(CPFExisteStatus)
                                    }
                                    id="formGroupExampleInput" placeholder="Example input" />
                                <div
                                    hidden={CPFExisteStatus == 0 ? true : false}
                                    className={ReturnStatusCPF(CPFExisteStatus) + '-feedback'}>

                                    {ReturnStatusCPFDescription(CPFExisteStatus)}
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Nome</label>
                                <input type="text"
                                    onChange={e => ChangeNome(e.target.value)}
                                    value={ValorNomeEdit}
                                    className={
                                        'form-control is-' +
                                        ReturnStatusShowNomeDescription(ValorNomeEdit)
                                    }
                                    placeholder="Another input" />
                                <div
                                    hidden={ReturnStatusHiddenDescription(ValorNomeEdit)}
                                    className={
                                        ReturnStatusShowNomeDescription(ValorNomeEdit) + '-feedback'
                                    }
                                >
                                    {ReturnStatusNomeDescription(ValorNomeEdit)}
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Email</label>
                                <input type="text"
                                    onChange={e => ChangeEmail(e.target.value)}
                                    value={ValorEmailEdit}
                                    className={
                                        'form-control is-' +
                                        ReturnStatusEmail(EmailExisteStatus)
                                    }
                                    placeholder="Another input" />
                                <div
                                    hidden={EmailExisteStatus == 0 ? true : false}
                                    className={
                                        ReturnStatusEmail(EmailExisteStatus) + '-feedback'
                                    }
                                >
                                    {ReturnStatusEmailDescription(EmailExisteStatus)}
                                </div>
                            </div>
                            <form className="was-validated">
                                <div className='form-group'>
                                    <label>Empresa:</label>
                                    <select
                                        className="custom-select"
                                        onChange={e => ChangeEmployee(e.target.value)} required>
                                        <option value="">Selecione:</option>
                                        {ReturnPopulateDropSelectEmploy(ListaEmpresa)}
                                    </select>
                                    <div className="invalid-feedback">
                                        'É obrigatório selecionar uma empresa.'
                              </div>
                                </div>
                            </form>
                        </form>

                    }

                    {UpdateEmployeeState &&
                        <div className='alert alert-success' role='alert'>
                            <h4 className='alert-heading'>Sucesso!</h4>
                            <p>Atualização de funcionario realizado com sucesso.</p>
                            <hr />
                        </div>
                    }
                    {UpdateEmployeeState == false &&
                        <div className='alert alert-danger' role='alert'>
                            <h4 className='alert-heading'>Erro!</h4>
                            <p>Erro inesperado.</p>
                            <hr />
                        </div>
                    }

                </Modal.Body>


                {UpdateEmployeeState === null &&
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                </Button>

                        {EnableButtonSaveFuncionario()}

                    </Modal.Footer>
                }

            </Modal>
        </div>
    )
}