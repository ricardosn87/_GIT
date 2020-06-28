import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Badge from 'react-bootstrap/Badge';


export const MarcaFilter = () => {

    const [open, setOpen] = useState(false);

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
                                        <label for="validationDefault01">Nome</label>
                                        <input type="text" className="form-control" id="validationDefault01" value="" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label for="validationDefault02">Descrição</label>
                                        <input type="text" className="form-control" id="validationDefault02"  value="" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                    <label for="validationDefault02">Empresa</label>
                                        <select className="form-control" id="inlineFormCustomSelectPref">
                                            <option selected>Choose...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
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
                    Filtro(s) <Badge variant="light">9</Badge>
                </Button>
            </>
        </div>
    )
}