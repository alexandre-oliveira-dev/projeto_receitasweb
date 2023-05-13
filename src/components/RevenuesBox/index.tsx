import React,{useEffect,useState} from "react";
import "./style.css";
import firebase from "../../services/firebase";

type PromisseRenevues = {
  title:string,
  nivel:string,
  categoria:[string],
  tipo:string,
  banners:[string],
  dataingredientes:string,
  modo:string
}

export default function RevenuesBox() {

  const [data,setData] = useState([])

  useEffect(()=>{
    async function loadReceitas(){
     const response = await firebase.firestore().collection('receitas').get()
     setData(response.docs.map(item => item.data()) as any)
     console.log(response.docs.map(item => item.data()))
    }
    loadReceitas()
  },[])


  return (
    <div className="boxRevenues">
      {data.map((item:PromisseRenevues,index:number) => {
        return (
          <div key={index} className="itemreceita">
            <img src={item.banners[0]} alt=""></img>
            <h3>{item.title.toUpperCase()}</h3>
            <p>Tempo de preparo: {''}</p>
            <p>Nível de dificuldade: {item.nivel}</p>
            <a href="#">Ver receita</a>
          </div>
        );
      })}
    </div>
  );
}
