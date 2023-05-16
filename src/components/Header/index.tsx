import React, { useState, useEffect } from "react";
import "./style.css";
import firebase from "../../services/firebase";

export default function Header() {
  const [showmenureceitas, setShowmenureceitas] = useState<boolean>();
  const [datauser, setDatauser] = useState<any>();

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("@receitasweb") as string) || {};
    setDatauser(userdata?.user);
  }, []);

  const MenuReceita = () => {
    return (
      <div
        onMouseEnter={() => {
          document.querySelector(".menureceitas")?.classList.add("animationmenu")}}
        onMouseLeave={() => {
          document.querySelector(".menureceitas")?.classList.remove("animationmenu");
        }}
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
          <strong>Sobremesas</strong>
          <a href="/">Bolos</a>
          <a href="/">Tortas</a>
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
        <button type="button" onClick={() => (window.location.href = "/")}>
          Início
        </button>
        <button
          type="button"
          onMouseEnter={() => {
            document.querySelector(".menureceitas")?.classList.add("animationmenu");
          }}
          >
          Receitas
        </button>
        {<MenuReceita></MenuReceita>}
        <button type="button" onClick={() => (window.location.href = "/post")}>
          Postar receitas
        </button>
        <button onClick={() => (window.location.href = "/minhas_receitas")} type="button">Minhas receitas</button>
      </nav>
      <div className="user-area">
        {!datauser ? (
          <>
            <button onClick={() => (window.location.href = "/cadastro")}>Entrar</button>
            <button onClick={() => (window.location.href = "/cadastro")}>Cadastre-se</button>
          </>
        ) : (
          <div>
            <p>{datauser.email}</p>
            <button
              onClick={async () => {
                await firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    localStorage.removeItem("@receitasweb");
                    window.location.reload();
                  });
              }}
            >
              sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
