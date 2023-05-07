import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./services/routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RouterApp></RouterApp>
      </BrowserRouter>
    </div>
  );
}

export default App;
