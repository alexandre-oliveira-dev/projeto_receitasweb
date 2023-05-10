import React, { useState } from "react";
import "./style.css";

export default function Header() {
  const [showmenureceitas, setShowmenureceitas] = useState<boolean>();

  const MenuReceita = () => {
    return (
      <div
        onMouseEnter={() => setShowmenureceitas(true)}
        onMouseLeave={() => setShowmenureceitas(false)}
        className="menureceitas"
      >
        <div className="boxbtnsmenureceitas">
        <strong>Geral</strong>
            <a href="/">Doces</a>
            <a href="/">salgados</a>
            <a href="/">Massas</a>
            <a href="/">Fitness</a>
        </div>
        <div className="boxbtnsmenureceitas">
          <strong>Carnes</strong>
            <a href="/">Bovino</a>
            <a href="/">Aves</a>
            <a href="/">Peixes</a>
        </div>
        <div className="boxbtnsmenureceitas">
          <strong>Bebidas</strong>
            <a href="/">Drinks</a>
            <a href="/">Milkshakes</a>
            <a href="/">Sucos</a>
        </div>
      </div>
    );
  };
  return (
    <header className="containerHeader">
      <div className="logo-area">logo</div>
      <nav className="navbarbtns">
        <button type="button" onClick={()=> window.location.href='/'}>Início</button>
        <button type="button" onMouseEnter={() => setShowmenureceitas(true)}>
          Receitas
        </button>
        {showmenureceitas && <MenuReceita></MenuReceita>}
        <button type="button" onClick={()=> window.location.href='/post'}>Postar receitas</button>
        <button type="button">Minhas receitas</button>
      </nav>
      <div className="user-area">
        <button>Entrar</button>
        <button>Cadastre-se</button>
      </div>
    </header>
  );
}
