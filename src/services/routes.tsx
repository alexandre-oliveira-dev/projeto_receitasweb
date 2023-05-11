import { Route, Switch } from "react-router-dom";
import React from "react";
import Homepage from "../pages/Home";
import PostRenevues from "../pages/PostRenevues";
import Cadastro from "../pages/Cadastro-Login";


export default function RouterApp() {
    return (
        <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route exact path="/post" component={PostRenevues}></Route>
            <Route exact path="/cadastro" component={Cadastro}></Route>
        </Switch>
    )
}