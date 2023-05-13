import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./services/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <RouterApp></RouterApp>
          <ToastContainer autoClose={2000} position="top-center"></ToastContainer>
        </BrowserRouter>
    </div>
  );
}

export default App;
