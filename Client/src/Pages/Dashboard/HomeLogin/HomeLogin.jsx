import React from "react";
import "./HomeLogin.css";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "../../../Components/Header/Header";

//imports das images
import grafico from "../../../images/GRAFICOS.png";
import node from "../../../images/NODE-LOGO.png";
import ufc from "../../../images/UFC-LOGO.png";
import react from "../../../images/REACT-LOGO.png";
import Navbar from "../../../Components/Navbar/Navbar";

import NotFound from "../../NotFound/NotFound";

const HomeLogin = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  const perfil = () => {
    navigate("/perfil");
  };

  if (auth.token) {
    return (
      <div className="container--pagina--inicial-homelogin">
        <Navbar></Navbar>
        <div className="container-direita-homelogin">
          <Header></Header>

          <div className="container-direita-center">
            <div className="infos-top">
              <div className="infos-top__esquerda">
                <h1>
                  FAÇA O CONTROLE DE SEUS GASTOS E GERENCIE SUA VIDA FINANCEIRA
                </h1>
              </div>

              <div className="infos-top__direita">
                <img src={grafico} alt="Uma imagem de graficos" />
              </div>
            </div>

            <div className="infos-mid">
              <div className="infos-mid__esquerda">
                <h1>ACESSE AS INFORMAÇÕES DE SEU PERFIL</h1>
              </div>

              <div
                className="infos-mid__direita"
                onClick={perfil}
              >
                <p>Perfil</p>
              </div>
            </div>

            <div className="infos-bot">
              <div className="infos-bot__container">
                <img src={node} alt="" />
              </div>

              <div className="infos-bot__container">
                <img src={ufc} alt="" />
              </div>

              <div className="infos-bot__container">
                <img src={react} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound></NotFound>;
  }
};

export default HomeLogin;
