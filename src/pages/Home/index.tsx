import React from "react";
import "./style.css";
import Header from "../../components/Header";
import InputSearchHome from "../../components/InputSearchHome";
import Title from "../../components/Titles";
import RevenuesBox from "../../components/RevenuesBox";

const Homepage = () => {
  return (
    <div className="container-homepage">
      <Header></Header>
      <section className="container-section1">
        <Title
          key={1}
          level={"400"}
          color="#fff"
          size={"40px"}
          width="400px"
          shadow={true}
          title="Milhares de Receitas na palma da sua mão!"
          margin="200px 0 0 0"
        ></Title>

        <InputSearchHome></InputSearchHome>
      </section>
      <section className="container-section2">
        <Title key={2} level={"600"} color="coral" size={"30px"} title="Melhores Receitas"></Title>

        <RevenuesBox></RevenuesBox>
      </section>
    </div>
  );
};
export default Homepage;
