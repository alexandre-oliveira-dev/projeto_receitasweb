import React, { useEffect, useState } from "react";
import "./style.css";
import firebase from "../../services/firebase";
import { PromisseRenevues } from "../RevenuesBox";

export default function Footer() {
  const [data, setData] = useState([""]);

  useEffect(() => {
    async function loadReceitas() {
      const response = await firebase.firestore().collection("receitas").get();
      const items: [PromisseRenevues] = response.docs.map((item) => item.data()) as any;
      setData(items.map((i) => i.title).slice(0,8));
    }
    loadReceitas();
  }, []);


  return (
    <footer className="footer">
      <div className="box-footer-content">
        <div className="box-footer-btns">
          <h3>Categorias</h3>
          <a href="/receitas/doces">Doces</a>
          <a href="/receitas/salgados">Salgados</a>
          <a href="/receitas/carnes">Carnes</a>
          <a href="/receitas/sucos">Sucos</a>
        </div>
        <div className="box-footer-btns">
          <h3>Ultimas receitas</h3>
          {data.map((item, index) => {
            return (
              <a key={index} href={`/receitas/${item}`}>
                {item}
              </a>
            );
          })}
        </div>
        <div className="logo-area"><p>Receitas</p> <strong>Web</strong></div>

      </div>
      <p style={{textAlign:"center",color:"#fff"}}>©️2023-Receitas web todos direitos reservados.</p>
    </footer>
  );
}
