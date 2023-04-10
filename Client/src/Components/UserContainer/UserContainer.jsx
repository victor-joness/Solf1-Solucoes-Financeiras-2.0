import React from "react";
import "./UserContainer.css";

import { useSelector } from "react-redux";

const UserContainer = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  return (
    <div className="user-infos-container">
      <div className="user-infos-container__img">
        <img src={`/upload/${auth.Img}`} alt="imagem de perfil do usuario" />
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
  );
};

export default UserContainer;
