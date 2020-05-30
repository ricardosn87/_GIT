import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
//import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';


class MenuInicial extends Component {

    render() {
        return (
            <>
                <div>
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Active</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default MenuInicial;
