import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Badge from 'react-bootstrap/Badge';


export const MarcaFilter = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1>MarcaFilter</h1>
            <>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Filtro(s) <Badge variant="light">9</Badge>
      </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
        </div>
                </Collapse>
            </>

        </div>
    )
}