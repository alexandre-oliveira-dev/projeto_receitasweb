import React from 'react'
import './style.css'
import {FiSearch} from 'react-icons/fi'

export default function InputSearchHome(){
    return(
        <div className='inputSearch'>
            <input type='text' placeholder='Pesquise sua receita aqui'></input>
            <FiSearch></FiSearch>
        </div>
    )
}