import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Badge from 'react-bootstrap/Badge';


export const MarcaFilter = () => {

    const [open, setOpen] = useState(false);
    const [AmountFilter, SetAmountFilter] = useState(0);

    const [ValorMarca, SetValorMarca] = useState('');
    const [CountFilter, SetCountFilter] = useState(0);

    const [ValorDescricao, SetValorDescricao] = useState('');
    const [CountDescricaoFilter, SetCountDescricaoFilter] = useState(0);

    const [ValorEmpresa, SetValorEmpresa] = useState(0);
    const [CountEmpresaFilter, SetCountEmpresaFilter] = useState(0);

    const ListaEmpresa = useSelector(
        state => state.EmpresaState.ListaEmpresa
    )

    const ChangeNomeFilter = (Nome) => {
        SetValorMarca(Nome)
        if (Nome !== '') {
            if (CountFilter === 0) {
                SetAmountFilter(AmountFilter + 1)
                SetCountFilter(1)
            }
        }
        else {
            SetAmountFilter(AmountFilter - 1)
            SetCountFilter(0)
        }
    }

    const ChangeDescricaoFilter = (Descricao) => {
        SetValorDescricao(Descricao)
        if (Descricao !== '') {
            if (CountDescricaoFilter === 0) {
                SetAmountFilter(AmountFilter + 1)
                SetCountDescricaoFilter(1)
            }
        } else {
            SetAmountFilter(AmountFilter - 1)
            SetCountDescricaoFilter(0)
        }
    }

    const ChangeCompanyFilter = (Company) => {
        if (Company !== 'Selecione:') {
            var employInteiro = parseInt(Company)
            SetValorEmpresa(employInteiro)
            if (CountEmpresaFilter === 0) {
                SetCountEmpresaFilter(1)
                SetAmountFilter(AmountFilter + 1)
            }
        }
        else {
            SetValorEmpresa(0)
            SetCountEmpresaFilter(0)
            SetAmountFilter(AmountFilter - 1)
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

    return (
        <div>
            <>


                <Collapse in={open}>
                    <div className="alert alert-light" role="alert">
                        <h4 className="alert-heading">Filtro de Marcas</h4>
                        <p>
                            <div id="example-collapse-text">
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label>Nome</label>
                                        <input type="text" onChange={e => ChangeNomeFilter(e.target.value)} className="form-control" value={ValorMarca} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>Descrição</label>
                                        <input type="text" onChange={e => ChangeDescricaoFilter(e.target.value)} className="form-control" value={ValorDescricao} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>Empresa</label>
                                        <select className="custom-select" onChange={e => ChangeCompanyFilter(e.target.value)} required>
                                            <option value={undefined}>Selecione:</option>
                                            {PopulateSelectCompany(ListaEmpresa)}
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </p>
                    </div>

                </Collapse>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Filtro(s) <Badge variant="light">{AmountFilter}</Badge>
                </Button>
                {' '}
                <Button>
                    Buscar
                </Button>
            </>
        </div>
    )
}