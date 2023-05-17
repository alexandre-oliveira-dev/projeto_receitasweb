import React, { useMemo, useState, useEffect } from "react";
import "./style.css";
import Title from "../Titles";
import firebase from "../../services/firebase";

type PromisseRenevues = {
  title: string;
  nivel: string;
  categoria: [string];
  tipo: string;
  banners: [string];
  dataingredientes: [string];
  modo: string;
  avaliacoes: string;
  tempoPreparo: string;
};

export default function RevenueWeek() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadReceitas() {
      const response = await firebase.firestore().collection("receitas").get();
      setData(response.docs.map((item) => item.data()).reverse().filter((item,index) => index === 0) as []);
    }
    loadReceitas();
  }, []);
  
  console.log(data)
  return (
    <div className="containerRevenueWeek">
      {data.map((item: PromisseRenevues,index) => {
        return (
          <>
            <div key={index} className="box-RevenueWeek">
              <img src={item.banners[0]} alt=""></img>
            </div>
            <div className="box-RevenueWeek">
              <Title
                level="400"
                color={"coral"}
                size="25px"
                title={item.title.toLocaleUpperCase()}
              ></Title>
              <p>Tempo de preparo: {item.tempoPreparo}</p>
              <p>Nível de dificuldade: {item.nivel}</p>
              <p>Avaliações: {item.avaliacoes}</p>
              <br></br>
              <div style={{ display: "flex",flexDirection:"column",gap:"2rem" }}>
                <div style={{ width: "100%" }}>
                  <h3>Ingredientes:</h3>
                  <br></br>

                  {item.dataingredientes.map((item, index) => {
                    return (
                      <p style={{color:'coral',marginTop:"10px"}}>
                        {index + 1}° {item}
                      </p>
                    );
                  })}
                </div>
                <div style={{ width: "100%" }}>
                  <h3>Modo de preparo:</h3>
                  <br></br>

                  <p style={{color:'coral'}}>{item.modo}</p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
