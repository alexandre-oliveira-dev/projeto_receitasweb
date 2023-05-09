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
            <a href="#">Doces</a>
            <a href="#">salgados</a>
            <a href="#">Massas</a>
            <a href="#">Fitness</a>
        </div>
      </div>
    );
  };
  return (
    <header className="containerHeader">
      <div className="logo-area">logo</div>
      <nav className="navbarbtns">
        <button type="button">Início</button>
        <button type="button" onMouseEnter={() => setShowmenureceitas(true)}>
          Receitas
        </button>
        {showmenureceitas && <MenuReceita></MenuReceita>}
        <button type="button">Postar receitas</button>
      </nav>
      <div className="user-area">
        <button>Entrar</button>
        <button>Cadastre-se</button>
      </div>
    </header>
  );
}
