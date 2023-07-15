import React from "react";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import "./Graficos.css";

//import CandleStick from "./components/index";
import {BasicArea, BasicColumn, SimplePie, StackedColumn} from "./components/index.jsx";

const Graficos = () => {
  const mediaReceita = 150/2;
  const mediaDespesa = 75/2;
  const mediaLiquida = 200/2;

  return (
    <div className="container-graficos">
      <Navbar></Navbar>
      <div className="container-direita-graficos"> 
        <Header></Header>
        <div className="container-grid-graficos">
          <div className="row1-graficos div">
            <div className="basic-area">
              <BasicArea title="Receita" media={mediaReceita}></BasicArea>
            </div>
            <div className="basic-area">
              <BasicArea title="Despesa" media={mediaDespesa}></BasicArea>
            </div>
            <div className="basic-area">
              <BasicArea title="Líquido" media={mediaLiquida}></BasicArea>
            </div>
          </div>
          <div className="row2-graficos div">
            <div className="barras div">
              <h4>Transações com Categorias</h4>
              <BasicColumn></BasicColumn>
            </div>
            <div className="pizza div">
              <h4>Tipos de Categoria</h4>
              <SimplePie></SimplePie>
            </div>
            <div className="barras2 div">
              <h4>Cartões dos Usuários</h4>
              <StackedColumn></StackedColumn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graficos;