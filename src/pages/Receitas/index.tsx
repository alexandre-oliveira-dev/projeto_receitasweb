import React, { useEffect, useState } from "react";
import "./style.css";
import "../../components/RevenueWeek/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import firebase from "../../services/firebase";
import { useParams } from "react-router-dom";
import RevenuesBox, { PromisseRenevues } from "../../components/RevenuesBox";
import Title from "../../components/Titles";

export default function Receitas() {
  const [data, setData] = useState<any>([]);
  const { nomereceita }: any = useParams();

  useEffect(() => {
    async function loadReceitas() {
      const response = await firebase.firestore().collection("receitas").get();
      const lista = response.docs.map((item) => item.data());
      setData(
        lista.filter(function (item) {
          return item.title.toLowerCase().indexOf(nomereceita.toLowerCase()) > -1;
        })
      );
    }
    loadReceitas();
  }, [nomereceita]);

  console.log(data)
  return (
    <div className="container-receitas">
      <Header></Header>
      <section className="container-section-recitas">
        {!data.lenght ? (
         <>
          <Title title="Receita não encontrada! 😕" color="coral" level="600" size="30px"></Title> 
          <Title title="Você pode gostar:" color="coral" level="600" size="20px" margin="0 0 -60px 0"></Title> 
          <RevenuesBox></RevenuesBox>
         </>
        ) : (
          data.map((item: PromisseRenevues, index: number) => {
            return (
              <div key={index} className="itemreceita">
                <img src={item.banners[0]} alt=""></img>
                <h3>{item.title.toUpperCase()}</h3>
                <p>Tempo de preparo: {item.tempoPreparo}</p>
                <p>Nível de dificuldade: {item.nivel}</p>
                <a href="#">Ver receita</a>
              </div>
            );
          })
        )}
      </section>
      <Footer></Footer>
    </div>
  );
}
