import React,{useEffect,useState} from "react";
import "./style.css";
import firebase from "../../services/firebase";

export type PromisseRenevues = {
  id:string,
  title:string,
  nivel:string,
  categoria:[string],
  tipo:string,
  banners:[string],
  dataingredientes:[string],
  modo:string
  tempoPreparo:string
}

export default function RevenuesBox() {

  const [data,setData] = useState([])

  useEffect(()=>{
    async function loadReceitas(){
     const response = await firebase.firestore().collection('receitas').get()
     setData(response.docs.map(item => item.data()).slice(0,8) as any)
    }
    loadReceitas()
  },[])


  return (
    <div className="boxRevenues">
      {data.map((item:PromisseRenevues,index:number) => {
        return (
          <div key={index} className="itemreceita" onClick={()=>window.location.href=`/receita/${item.id}`}>
            <img src={item.banners[0]} alt=""></img>
            <h3>{item.title.toUpperCase()}</h3>
            <p>Tempo de preparo: {item.tempoPreparo}</p>
            <p>Nível de dificuldade: {item.nivel}</p>
            <a href={`/receita/${item.id}`}>Ver receita</a>
          </div>
        );
      })}
    </div>
  );
}
