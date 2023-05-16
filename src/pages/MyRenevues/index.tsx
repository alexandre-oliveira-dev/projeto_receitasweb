import React, { useEffect, useState } from "react";
import "./style.css";
import "../../components/RevenuesBox/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import firebase from "../../services/firebase";
import Title from "../../components/Titles";
import { PromisseRenevues } from "../../components/RevenuesBox";

export default function MyRenevues() {
  const [data, setData] = useState<any>([]);
  const [datalenght, setDatalenght] = useState<number>(0);

  useEffect(() => {
    async function loadReceitas() {
      const userdata = JSON.parse(localStorage.getItem("@receitasweb") as string) || '';
      console.log(userdata)
      if (!userdata) {
        window.location.href = "/";
        return;
      }
      const response = await firebase.firestore().collection("receitas").get();
      const filter = response.docs.map((item) => item.data());
      setData(filter.filter((item) => item?.user === userdata?.user.uid));
      setDatalenght(filter.filter((item) => item?.user === userdata?.user.uid).length);
    }
    loadReceitas();
  }, []);

  return (
    <div className="container-Myrenevues">
      <Header></Header>
      <section className="content-myrenevues">
       {datalenght &&
        <Title
          title="Minhas Receitas 😎"
          color="coral"
          level="600"
          size="30px"
          align="center"
        ></Title>}
        <div className="box-minhasreceitas">
          {datalenght < 1 ? (
           <>
            <Title
              title="Nada por aqui ainda 😋"
              color="coral"
              level="600"
              size="30px"
              align="center"
            ></Title>
            <a href="/post"></a>
           </>
          ) : (
            data.map((item: PromisseRenevues, index: number) => {
              return (
                <div
                  key={index}
                  className="itemreceita"
                  onClick={() => (window.location.href = `/receita/${item.id}`)}
                >
                  <img src={item.banners[0]} alt=""></img>
                  <h3>{item.title.toUpperCase()}</h3>
                  <p>Tempo de preparo: {item.tempoPreparo}</p>
                  <p>Nível de dificuldade: {item.nivel}</p>
                  <a href={`/receita/${item.id}`}>Ver receita</a>
                </div>
              );
            })
          )}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
