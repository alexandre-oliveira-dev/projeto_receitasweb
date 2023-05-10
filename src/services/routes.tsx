import { Route, Switch } from "react-router-dom";
import React from "react";
import Homepage from "../pages/Home";
import PostRenevues from "../pages/PostRenevues";
export default function RouterApp() {
    return (
        <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route exact path="/post" component={PostRenevues}></Route>
        </Switch>
    )
}