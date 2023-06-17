import React, { useEffect } from "react";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import "./Graficos.css";

const Graficos = () => {
  return (
      <div className="container-graficos">
        <Navbar></Navbar>
        <div className="container-direita-graficos">
          <Header></Header>
        </div>
      </div>
    );
}

export default Graficos;