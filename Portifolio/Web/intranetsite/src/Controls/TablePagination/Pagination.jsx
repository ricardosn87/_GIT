
import * as React from 'react';
import { EmpresaTableListDTO } from './../../Gerenciamento/Empresa/Model/EmpresaTableListDTO';
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { PaginationDTO } from './PaginationDTO';

function Pagination(props) {
    const dispatch = useDispatch();

    const FilterDataTable = (position) => {
        dispatch({ type: 'LIST_EMPRESA_FILTER', ListaEmpresaFilter: position })
    }

    const DadosPaginations = props.DadosPaginations;
    const PositionFilter = props.PositionFilter;

    var DataEmpresaArray = DadosPaginations;
    var Positions = [];
    let ControlPosition = 0;   

    const CreateArrayPagination = () => {
        var PositionsClear = [];
        DataEmpresaArray.map((key, index) => {

            if (ControlPosition !== key.Position) {
                var paginationDTO = new PaginationDTO(key.Position, <li className="page-item" onClick={() => (FilterDataTable(key.Position))}><a class="page-link"  >{key.Position}</a></li>)
                PositionsClear.push(paginationDTO)
            }
            ControlPosition = key.Position
        })

        return PositionsClear
    }

    const RenderPositionsClear = () => {
        var PositionsClear = [];
        PositionsClear = CreateArrayPagination()

        return Positions = RenderPositionChoose(PositionsClear);
    }

    const RenderPositionChoose = (Positions) => {
        if (PositionFilter === 1) {
            return Positions = Positions.filter(x => x.Position < 4);
        }

        if (PositionFilter === Positions.length) {
            return Positions = Positions.filter(x => x.Position > (Positions.length - 3));
        }

        var initPosition = PositionFilter - 1;
        var endPosition = PositionFilter + 1;
        return Positions = Positions.filter(x => x.Position >= initPosition && x.Position <= endPosition);
    }

    const RenderPositionBefore = () => {
       
        var minPosition = Positions.sort()[0].Position;          
        FilterDataTable(minPosition);
    }   

    const RenderPositionAfter = () => {
       
        let maxValue = Positions.reduce((max, p) => p.Position > max ? p.Position : max, Positions[0].Position);       
        FilterDataTable(maxValue);
    }

    const PositionsClear = RenderPositionsClear()   

    return (
        <div>
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={() => RenderPositionBefore()}>
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {PositionsClear.map(x =>
                            x.Link
                        )}
                        <li className="page-item" onClick={() => RenderPositionAfter()}>
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}


export default Pagination