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
      <div>
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
        <button type="button" onClick={() => (window.location.href = "/post")}>
          Postar receitas
        </button>
        <button onClick={() => (window.location.href = "/minhas_receitas")} type="button">
          Minhas receitas
        </button>
    </nav>
  );
}
