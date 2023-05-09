import React, { useMemo, useState, useEffect } from "react";
import "./style.css";
import { data } from "../../datasimulation";
import Title from "../Titles";

export default function RevenueWeek() {
  return (
    <div className="containerRevenueWeek">
      <div className="box-RevenueWeek">
        <img src={data.map((item) => item.fotos)[0]} alt=""></img>
      </div>
      <div className="box-RevenueWeek">
        <Title
          level="400"
          color={"coral"}
          size="25px"
          title={data.map((item) => item.title.toLocaleUpperCase())[0]}
        ></Title>
        <p>Tempo de preparo: {data.map((item) => item.tempo)[0]}</p>
        <p>Nível de dificuldade: {data.map((item) => item.level)[0]}</p>
        <p>Avaliações: {data.map((item) => item.avaliacoes)[0]}</p>
        <br></br>
        <div style={{ display: "flex" }}>
          <div style={{width:'30%'}}>
            <h3>Ingredientes:</h3>
            <br></br>

            {data
              .map((item) => item.ingredientes)[0]
              .map((item, index) => {
                return (
                  <p>
                    {index + 1}° {item}
                  </p>
                );
              })}
          </div>
          <div style={{width:'70%'}}>
            <h3>Modo de preparo:</h3>
            <br></br>

            <p>{data.map((item) => item.modoPreparo)[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
