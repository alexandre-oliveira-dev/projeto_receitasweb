import React,{ useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./services/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  useEffect(()=>{
   setInterval(() => {
    localStorage.removeItem("@files")
   }, 600000);
  },[])

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
