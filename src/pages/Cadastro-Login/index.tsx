import React, { useContext, useState } from "react";
import "./style.css";
import Title from "../../components/Titles";
import {Register,Login} from "./FunctionsContext";
import { toast } from "react-toastify";

type RegisterCredencials ={
  name:string,
  email:string,
}


export default function Cadastro() {
  const [formtype, setFormtype] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== repetPassword) {
      toast.error('Senhas não conferem!')
      return;
    }
    await Register({ name, email, password })
      .then(() => {
        toast.success("cadastro efetuado com sucesso!");
        setEmail('')
        setPassword('')
        setRepetPassword('')
        setFormtype(true)
      })
      .catch((err: any) => {
        toast.error("ops, tente novamente mais tarde!");
        console.log(err);
      });
  }

  async function handleLogin(e: React.FormEvent){
    e.preventDefault();
    await Login(email,password)
  }

  return (
    <div className="container-cadastro">
      <div className="container-form-cadastro-login">
        {!formtype ? (
          <form id="form1" onSubmit={handleRegister}>
            <Title
              title="Cadastre-se e explore nossas receitas incríveis!"
              color="coral"
              level="800"
              size="30px"
              shadow={false}
            ></Title>
            <>
              <Title title="Cadastre-se" color="coral" level="600" size="20px"></Title>
              <div style={{ display: "flex", width: "70%" }}>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  className="inputform"
                  placeholder="Nome"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  className="inputform"
                  placeholder="E-mail"
                />
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="inputform"
                placeholder="Senha"
              />
              <input
                onChange={(e) => setRepetPassword(e.target.value)}
                type="password"
                name="password"
                className="inputform"
                placeholder="Digite novamente a senha"
              />
              <button type="submit" className="finished">
                Finalizar
              </button>
              <button
                className="button-toogle"
                type="button"
                onClick={() => {
                  setFormtype(true);
                  document.getElementById("form1")?.classList.add("formanimation");
                }}
              >
                Fazer login
              </button>
            </>
          </form>
        ) : (
          <form id="form2" onSubmit={handleLogin}>
            <Title
              title="As melhores receitas você encontra aqui!"
              color="coral"
              level="800"
              size="30px"
              shadow={false}
            ></Title>
            <>
              <Title title="Entrar" color="coral" level="600" size="20px"></Title>
              <input  onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="inputform" placeholder="E-mail" />
              <input  onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="inputform" placeholder="Senha" />
              <button type="submit" className="finished">
                Entrar
              </button>
              <button
                type="button"
                className="button-toogle"
                onClick={(e) => {
                  e.preventDefault();
                  setFormtype(false);
                  document.getElementById("form2")?.classList.add("formanimation2");
                }}
              >
                Cadastre-se
              </button>
            </>
          </form>
        )}
      </div>
    </div>
  );
}
