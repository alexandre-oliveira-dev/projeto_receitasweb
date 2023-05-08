import React from "react";
import './style.css'

export default function Header(){

    const navbarBtns = [
        {id:1,title:'Início',link:'/', function:'',icon:'',},
        {id:2,title:'Receitas',link:'', function:'',icon:'',},
        {id:3,title:'Postar receitas',link:'', function:'',icon:'',}
    ]

    return(
        <header className="containerHeader">
            <div className="logo-area">logo</div>
            <nav>
               {navbarBtns.map(btn => {
                return(
                    <button type="button">{btn.title}</button>
                )
               })
               }
            </nav>
            <div className="user-area">
                <button>Entrar</button>
                <button>Cadastre-se</button>
            </div>
        </header>
    )
}