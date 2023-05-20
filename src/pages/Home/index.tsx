import React from "react";
import "./style.css";
import Header from "../../components/Header";
import InputSearchHome from "../../components/InputSearchHome";
import Title from "../../components/Titles";
import RevenuesBox from "../../components/RevenuesBox";
import RevenueWeek from "../../components/RevenueWeek";
import Footer from "../../components/Footer";

export const pageWidth = window.screen.width
const Homepage = () => {
  return (
    <div className="container-homepage">
      <Header></Header>
      <section className="container-section1">
        <Title
          key={1}
          level={"400"}
          color="#fff"
          size={pageWidth > 500 ?"40px" : '20px'}
          width={pageWidth > 500 ?"500px" : '100%'}
          shadow={true}
          title="Milhares de Receitas na palma da sua mão!"
          margin="200px 0 0 0"
          align="center"
        ></Title>

        <InputSearchHome></InputSearchHome>
      </section>
      <section className="container-section2">
        <Title key={2} level={"600"} color="coral" size={"30px"} title="Melhores Receitas"></Title>
        <RevenuesBox></RevenuesBox>
      </section>
      <section className="container-section3">
      <Title
          key={3}
          level={"600"}
          color="coral"
          size={"30px"}
          title="Em Destaque"
        ></Title>
        <RevenueWeek></RevenueWeek>
      </section>
      <Footer></Footer>
    </div>
  );
};
export default Homepage;
