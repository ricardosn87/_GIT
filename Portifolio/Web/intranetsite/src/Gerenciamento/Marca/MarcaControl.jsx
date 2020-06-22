import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MarcaFilter } from './MarcaFilter'
import { MarcaTableList } from './MarcaTableList'

export const MarcaControl = () => {
 
    return (
        <div>
            <MarcaFilter></MarcaFilter>
            <MarcaTableList></MarcaTableList>
        </div>
    )
}