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
  const [data, setData] = useState<any>([""]);
  const [datalenght, setDatalenght] = useState<number>(0);
  const { nomereceita }: any = useParams();

  useEffect(() => {
    async function loadReceitas() {
      const response = await firebase.firestore().collection("receitas").get();
      const lista = response.docs.map((item) => item.data());

      const arrayItems = lista.filter(function (item) {
        return item.categoria.toLowerCase().indexOf(nomereceita.toLowerCase()) > -1;
      }).concat(lista.filter(function (item) {
        return item.title.toLowerCase().indexOf(nomereceita.toLowerCase()) > -1;
      }),
      lista.filter(function (item) {
        return item.tipo.toLowerCase().indexOf(nomereceita.toLowerCase()) > -1;
      })
      )

      console.log(arrayItems)
      setData(arrayItems);
      setDatalenght(arrayItems.length);
    }
    loadReceitas();
  }, [nomereceita]);

  return (
    <div className="container-receitas">
      <Header></Header>
      <section className="container-section-recitas">
        {datalenght < 1 ? (
          <>
            <Title title="Receita não encontrada! 😕" color="coral" level="600" size="30px"></Title>
            <Title
              title="Você pode gostar:"
              color="coral"
              level="600"
              size="20px"
              margin="0 0 -60px 0"
            ></Title>
            <RevenuesBox></RevenuesBox>
          </>
        ) : (
          <>
            <Title
              title={`${datalenght} Receita(s) encontradas, buscando por: "${nomereceita}" `}
              color="coral"
              level="400"
              size="30px"
              align="center"
              width="100%"
            ></Title>
            <div style={{ width: "100%", display: "flex", gap: "20px", marginTop: "-5rem" }}>
              {data?.map((item: PromisseRenevues, index: number) => {
                return (
                  <div key={index} className="itemreceita">
                    <img
                      src={item?.banners[0]}
                      alt=""
                      onClick={() => (window.location.href = `/receita/${item.id}`)}
                    ></img>
                    <h3>{item.title.toUpperCase()}</h3>
                    <p>Tempo de preparo: {item.tempoPreparo}</p>
                    <p>Nível de dificuldade: {item.nivel}</p>
                    <a href={`/receita/${item.id}`}>Ver receita</a>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
      <Footer></Footer>
    </div>
  );
}
