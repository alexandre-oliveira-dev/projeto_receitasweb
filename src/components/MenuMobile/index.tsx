import React, { useState, useEffect } from "react";
import "./style.css";
import firebase from "../../services/firebase";

type ComponentVisible = {
  visible: boolean;
};

export default function MenuMobile({ visible }: ComponentVisible) {
  const [datauser, setDatauser] = useState<any>();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("@receitasweb") as string) || {};
    setDatauser(userdata?.user);
  }, []);

  return (
    <nav className="Menumobile" style={{ display: visible ? "flex" : "none" }}>
      <div className="user-area-mobile">
        {!datauser ? (
          <>
            <button
              className="btn-login-mobile"
              onClick={() => (window.location.href = "/cadastro")}
            >
              Entrar
            </button>
            <button
              className="btn-login-mobile"
              onClick={() => (window.location.href = "/cadastro")}
            >
              Cadastre-se
            </button>
          </>
        ) : (
          <div style={{display:"flex",flexDirection:"column",alignItems:'center'}}>
            <p style={{ color: "#fff" }}>Olá</p>
            <p style={{ color: "#fff" }}> {datauser.email}</p>
            <button
            style={{
              background:"none",
              border:'0',
              color:"red"
            }}
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
      <button
        className="btn-items-mobile"
        type="button"
        onClick={() => (window.location.href = "/")}
      >
        Início
      </button>
      <button
        className="btn-items-mobile"
        type="button"
        onClick={() => (window.location.href = "/post")}
      >
        Postar receitas
      </button>
      <button
        className="btn-items-mobile"
        onClick={() => (window.location.href = "/minhas_receitas")}
        type="button"
      >
        Minhas receitas
      </button>
      <p style={{ marginTop: "30px", fontWeight: "600", color: "#fff" }}>
        O que você procura hoje?
      </p>
      <br />
      <a href={`/receitas/${"doceS"}`}>Doces</a>
      <a href={`/receitas/${"salgadoS"}`}>salgados</a>
      <a href={`/receitas/${"massas"}`}>Massas</a>
      <br />

      <div className="logo-menu-mobile-area">
       <p>logo</p>
      </div>
    </nav>
  );
}
