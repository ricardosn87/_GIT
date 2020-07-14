import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { UserProfile } from './../../Usuario/UserProfile/UserProfile';
import * as Actions from '../Marca/MarcaActions'
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