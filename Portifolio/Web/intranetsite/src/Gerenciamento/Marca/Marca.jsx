import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MarcaControl } from './MarcaControl'
import { MarcaCadastro } from './MarcaCadastro/MarcaCadastro'

export const Marca = () => {
   return (
       <div>           
           <MarcaCadastro></MarcaCadastro>
           <MarcaControl></MarcaControl>
       </div>
   )
}