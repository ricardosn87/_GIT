import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'


export const MarcaCadastro = () => {
    return (
        <div>
            <nav className='navbar navbar-light bg-light justify-content-between'>
                <a className='navbar-brand'>Gerenciamento de Marcas</a>
                <form className='form-inline'>
                    <Button variant='primary' >
                        Novo
                    </Button>
                </form>
            </nav>
        </div>
    )
}