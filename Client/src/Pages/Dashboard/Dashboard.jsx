import React from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";

import { useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";

import iconUser from "../../images/icons options/USER.png";
import iconEndereco from "../../images/icons options/MAP-PIN.png";
import iconCredit from "../../images/icons options/CREDIT-CART.png";
import iconDespesa from "../../images/icons options/BOLSA-DINHEIRO.png";

const Dashboard = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  console.log(auth);

  const Dashboard_conta = () => {
    
  };

  const Dashboard_endereço = () => {
    
  };

  const Dashboard_despesa = () => {
    
  };

  const Dashboard_card = () => {
    
  };

  if (auth.token) {
    return (
      <div className="container-dashboard">
        <Navbar></Navbar>
        <div className="container-direita-dashboard">
          <div className="container-direita-header">
            <img src={`/upload/${auth.Img}`} alt="Imagem do user" />
            <h1>{auth.name}</h1>
          </div>

          <div className="container-direita-center">
            <div className="Dashboard--Container--direita__menu">
              <div className="user-infos-container">
                <div className="user-infos-container__img">
                  <img
                    src={`/upload/${auth.Img}`}
                    alt="imagem de perfil do usuario"
                  />
                </div>

                <div className="user-infos-container__pessoais">
                  <p className="user-infos-container__pessoais__Nome">
                    {`Nome : ${auth.name}`}
                  </p>
                  <p className="user-infos-container__pessoais__Email">
                    {`Email : ${auth.email}`}
                  </p>
                  <p className="user-infos-container__pessoais__Telefone">
                    {`Celular : ${auth.celular}`}
                  </p>
                  <p className="user-infos-container__pessoais__Endereço">
                    {`Endereço : ${auth.endereco}`}
                  </p>

                  <p className="user-infos-container__pessoais__Saldo">
                    {`Saldo : {total}`}
                  </p>
                </div>
              </div>
              <div className="OptionsContainer--infos">
                <div className="OptionsContainer--infos__conta">
                  <div
                    className="OptionsContainer--infos__conta__icon"
                    onClick={Dashboard_conta}
                  >
                    <img src={iconUser} alt="icon de user" />
                  </div>

                  <div
                    className="OptionsContainer--infos__conta__pessoais"
                    onClick={Dashboard_conta}
                  >
                    <p>Conta</p>
                    <p>Informações Pessoais</p>
                  </div>
                </div>

                <div className="OptionsContainer--infos__conta">
                  <div
                    className="OptionsContainer--infos__conta__icon"
                    onClick={Dashboard_endereço}
                  >
                    <img src={iconEndereco} alt="icon de user" />
                  </div>

                  <div
                    className="OptionsContainer--infos__conta__pessoais"
                    onClick={Dashboard_endereço}
                  >
                    <p>Endereço</p>
                    <p>Adicione seu endereço</p>
                  </div>
                </div>

                <div className="OptionsContainer--infos__conta">
                  <div
                    className="OptionsContainer--infos__conta__icon"
                    onClick={Dashboard_card}
                  >
                    <img src={iconCredit} alt="icon de user" />
                  </div>

                  <div
                    className="OptionsContainer--infos__conta__pessoais"
                    onClick={Dashboard_card}
                  >
                    <p>Método de Pagamento</p>
                    <p>Cadastre seus Cartões</p>
                  </div>
                </div>

                <div className="OptionsContainer--infos__conta">
                  <div
                    className="OptionsContainer--infos__conta__icon"
                    onClick={Dashboard_despesa}
                  >
                    <img src={iconDespesa} alt="icon de user" />
                  </div>

                  <div
                    className="OptionsContainer--infos__conta__pessoais"
                    onClick={Dashboard_despesa}
                  >
                    <p>Adicionar Despesa</p>
                    <p>Hora de passar dos limites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default Dashboard;
