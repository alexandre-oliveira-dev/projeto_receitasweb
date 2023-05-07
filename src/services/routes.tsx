import { Route, Switch } from "react-router-dom";
import React from "react";
import Homepage from "../pages/Home";

export default function RouterApp() {
    return (
        <Switch>
            <Route path="/" component={Homepage}></Route>
        </Switch>
    )
}