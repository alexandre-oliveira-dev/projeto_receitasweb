import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Title from "../../components/Titles";

export default function PostRenevues() {

    const [ingredientes, setIngrediente] = useState('')
    const [dataingredientes, setDatangrediente] = useState([''])

    async function handleformrenevues(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
    }

  return (
    <div className="container-post-renevues">
      <Header></Header>
      <form className="container-form-post"onSubmit={(e)=>handleformrenevues(e)} >
        <Title
          color="coral"
          level="600"
          size="30px"
          title="Compartilhe suas melhores receitas 😋"
        ></Title>

        <div className="box-input-form">
          <input
            type="text"
            name="title"
            placeholder="Nome da sua receita:"
            className="inputformrenevues"
          />
          <div className="inputformringredientes">
            <input
              type="text"
              name="title"
              placeholder="ingredientes:"
              onChange={(e) => setIngrediente(e.target.value)}
              value={ingredientes}
            />
            <button type="button" onClick={()=>{
                if(!ingredientes){
                    return;
                }
                setDatangrediente([...dataingredientes,ingredientes])
                setIngrediente('')
            }}>+</button>
          </div>
          <select className="inputformrenevues">
            <option disabled={true}>Nivel de dificuldade</option>
            <option>facil</option>
            <option>medio</option>
            <option>dificil</option>
          </select>
          <select className="inputformrenevues">
            <option disabled={true}>Tipo</option>
            <option>doce</option>
            <option>salgado</option>
          </select>
          <select className="inputformrenevues">
            <option disabled={true}>Categoria</option>
            <option>massas</option>
            <option>carnes</option>
            <option>bebidas</option>
            <option>sopas</option>
            <option>fitness</option>
            <option>lanches</option>
          </select>
            { dataingredientes.length > 1 && dataingredientes.slice(1).map((item,index) => {
            return(
                <p key={index} className="ingrediente-tag">{item} 
                <button style={{background:"none",color:"#fff",border:"0",marginLeft:'10px'}} onClick={()=>{
                    setDatangrediente(dataingredientes.filter(ing => ing !== item))
                }}>x</button></p>
            )
          })}
          <textarea
            name="preparo"
            placeholder="Modo de preparo: "
            style={{ width: "100%", padding: "1rem", outline: "none" }}
          ></textarea>
          <input type="file" multiple={true} className="inputformrenevues"></input>
          <button type="submit">Postar</button>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
}
