import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

//imports das images
import grafico from '../../../src/images/GRAFICOS.png';
import node from '../../../src/images/NODE-LOGO.png';
import ufc from '../../../src/images/UFC-LOGO.png';
import react from '../../../src/images/REACT-LOGO.png';

const Home = () => {
  const navigate = useNavigate();

  const redirecionaprapaginalogin = () => {
    navigate("auth");
  }

  return (
    <div className="container--pagina--inicial">
      <div className="container-direita">
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
            <h1>
              FAÇA LOGIN OU CRIE UMA CONTA PARA TER ACESSO A TODOS OS BENEFICIOS
            </h1>
          </div>

          <div
            className="infos-mid__direita"
            onClick={redirecionaprapaginalogin}
          >
            <p>Página de Login</p>
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
  );
};

export default Home;
