import React,{useState} from 'react'
import './style.css'
import {FiSearch} from 'react-icons/fi'
import {keyboardKey } from '@testing-library/user-event/dist/keyboard'
import { toast } from 'react-toastify'

export default function InputSearchHome(){
    const [nomereceita, setNomereceita] = useState<string>('')

    function handleEnter(e:keyboardKey){
        if(!nomereceita){
            return;
        }
        if(e.keyCode === 13){
            window.location.href=`/receitas/${nomereceita}`
        }
    }
    return(
        <div className='inputSearch'>
            <input onKeyDown={(e)=>handleEnter(e)} type='serach' placeholder='Pesquise sua receita aqui' onChange={(e)=> setNomereceita(e.target.value)}></input>
        <FiSearch style={{cursor:'pointer'}} onClick={()=>{
              if(!nomereceita){
                toast.info('Digite uma receita!')
                return;
            }
                window.location.href=`/receitas/${nomereceita}`
            }}></FiSearch>
        </div>
    )
}