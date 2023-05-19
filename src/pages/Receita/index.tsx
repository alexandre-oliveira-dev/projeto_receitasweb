import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import firebase from "../../services/firebase";
import RevenuesBox, { PromisseRenevues } from "../../components/RevenuesBox";
import Title from "../../components/Titles";

export default function Receita() {
  const { id }: any = useParams();
  const [data, setData] = useState([]);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    async function loadReceitas() {
      const response = await firebase.firestore().collection("receitas").get();
      const dat = response.docs.map((item) => item.data()) as [];
      setData(dat.filter((item: PromisseRenevues) => item.id == id));
    }
    loadReceitas();
  }, []);

  console.log(data);
  return (
    <div className="container-receita">
      <Header></Header>

      <section className="container-info-receita">
        {data.map((item: PromisseRenevues) => {
          return (
            <div key={item?.id} className="box-info-recita">
              <div className="style-mobile" style={{display:"flex",gap:"20px"}}>
                <div className="box-img-receita">
                  {!image ? (
                    <img id="indexImg" src={item.banners.map((i) => i)[0]} alt=""></img>
                  ) : (
                    <img id="indexImg" src={image} alt=""></img>
                  )}
                  <div
                    style={{ display: "flex", flexDirection: "column", width: "50%", gap: "10px" }}
                  >
                    {" "}
                    <img
                      onClick={() => setImage(item.banners.map((i) => i)[0])}
                      src={item.banners.map((i) => i)[0]}
                      alt=""
                      className="imgSelect"
                    ></img>
                    <img
                      onClick={() => setImage(item.banners.map((i) => i)[1])}
                      src={item.banners.map((i) => i)[1]}
                      alt=""
                      className="imgSelect"
                    ></img>
                  </div>
                </div>
                  <div style={window.screen.width > 500 ? { width: "50%" } : {width:"100%"}}>
                    <Title
                      title={item.title.toUpperCase()}
                      color="coral"
                      level="600"
                      size={window.screen.width > 500 ? `30px` : '20px'}
                      width="100%"
                      
                    ></Title>
                    <p>Tempo de preparo: {item.tempoPreparo}</p>
                    <p>Nível de dificuldade: {item.nivel}</p>
                    <br></br>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "start",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <h3>Ingredientes:</h3>
                        <br></br>

                        {item.dataingredientes.map((item, index) => {
                          return (
                            <p style={{ color: "coral",marginTop:"10px" }}>
                              {index + 1}° {item}
                            </p>
                          );
                        })}
                      </div>
                      <div>
                        <h3>Modo de preparo:</h3>
                        <br></br>

                        <p style={{ color: "coral" }}>{item.modo}</p>
                      </div>
                    </div>
                  </div>
              </div>
              <Title align='start' width='100%' title="Receitas recomendadas:" color="coral" level="600" size="25px" ></Title> 
              <RevenuesBox></RevenuesBox>
            </div>
          );
        })}
      </section>

      <Footer></Footer>
    </div>
  );
}
