import { Route, Switch } from "react-router-dom";
import React from "react";
import Homepage from "../pages/Home";
import PostRenevues from "../pages/PostRenevues";
import Cadastro from "../pages/Cadastro-Login";
import Receitas from "../pages/Receitas";
import Receita from "../pages/Receita";

export default function RouterApp() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage}></Route>
      <Route exact path="/post" component={PostRenevues}></Route>
      <Route exact path="/cadastro" component={Cadastro}></Route>
      <Route exact path="/receitas/:nomereceita" component={Receitas}></Route>
      <Route exact path="/receita/:id" component={Receita}></Route>
    </Switch>
  );
}
