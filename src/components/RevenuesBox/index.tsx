import React from "react";
import "./style.css";
import { data } from "../../datasimulation";

export default function RevenuesBox() {
  return (
    <div className="boxRevenues">
      {data.map((item) => {
        return (
          <div key={item.id} className="itemreceita">
            <img src={item.fotos} alt=""></img>
            <h3>{item.title.toUpperCase()}</h3>
            <p>Tempo de preparo: {item.tempo}</p>
            <p>Nível de dificuldade: {item.level}</p>
            <a href="#">Ver receita</a>
          </div>
        );
      })}
    </div>
  );
}
